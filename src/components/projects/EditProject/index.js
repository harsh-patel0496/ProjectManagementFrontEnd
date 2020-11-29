import React,{ useState,useContext } from 'react'
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import useNotification from '../../../hooks/useNotification';
import  { Card,CardContent,CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ProjectContext } from '../List'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(4),
        height: "100%"
    },
    media: {
        height: 140,
        [theme.breakpoints.down('md')]: {
            height: 0,
        }
      
    },
    card: {
        padding: theme.spacing(4),
    },
}));

function EditProject(props) {

    const {
        projects,
        setProjects,
        selectedProject
    } = useContext(ProjectContext)

    const classes = useStyles();
    const initialValues = {
        ...selectedProject.project
    }
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        title: Yup.string()
            .required(requiredAuthMsg),
        description: Yup.string()
            .required(requiredAuthMsg),
        client: Yup.object()
            .required(requiredAuthMsg),
        teams: Yup.array()
            .required(requiredAuthMsg),
        start_date: Yup.string()
            .required(requiredAuthMsg)
    });
    const [setNotification] = useNotification();
    const [isLoading,setIsLoading] = useState(false)

    const handleEditProject = (values) => {
        setIsLoading(true)
        const data = {...values}
        const options = {
            method: 'put',
            url: `/projects/${initialValues.id}`,
            data: {
                data
            }
        };

        apiCall(options).then( response => {
            setIsLoading(false)
            if(response.data && response.data.project){
                const oldProjects = projects
                oldProjects.splice(selectedProject.index,1,response.data.project)
                setProjects([...oldProjects])
                props.toggleDrawer('edit')
                const notificationOptions = {
                    open: true,
                    message: 'Project has been added Successfully!',
                    type: 'success'
                }
                setNotification(notificationOptions);
            }
        }).catch( error => {
            setIsLoading(false)
            console.log(error)
        })
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader 
                    title = "Edit Project"
                    subheader={initialValues.title}
                />
                <CardContent>
                    <Formik
                        children = {(props) => (<Form {...props} isLoading={isLoading}/>)}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit = { values => {
                            handleEditProject(values)
                        }}
                    >
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditProject
