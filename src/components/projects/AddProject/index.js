import React,{ useState,useEffect,useContext } from 'react'
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import { ClientContext } from '../List'
import useNotification from '../../../hooks/useNotification';
import  { Card,CardContent,CardHeader,CardMedia } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { ProjectContext } from '../List'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(4),
        //marginBottom: theme.spacing(10),
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
        //marginBottom: theme.spacing(10),
        //height: "100%"
    },
}));
function AddProject(props) {
    const {
        projects,
        setProjects
    } = useContext(ProjectContext)
    const classes = useStyles();
    const initialValues = {
        title: '',
        description: '',
        client: '',
        teams: '',
        start_date: ''
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
    const handleAddProject = (values) => {
        const data = {...values}
        const options = {
            method: 'post',
            url: '/projects',
            data: {
                data
            }
        };

        apiCall(options).then( response => {
            if(response.data && response.data.project){
                const oldProjects = projects
                oldProjects.splice(0,0,response.data.project)
                setProjects([...oldProjects])
                //setClients([response.data.client,...clients])
                //setOpenClientDialog(false)
               // state.tableRef && state.tableRef.onQueryChange()
                props.toggleDrawer()
                const notificationOptions = {
                    open: true,
                    message: 'Project has been added Successfully!',
                    type: 'success'
                }
                setNotification(notificationOptions);
            }
        }).catch( error => {
            console.log(error)
        })
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                {/* <CardMedia
                    className={classes.media}
                    image="/SidebarBackgound.png"
                    title="Contemplative Reptile"
                /> */}
                <CardHeader 
                    title = "Add New Project"
                    subheader="You can edit this details further"
                />
                <CardContent>
                    <Formik
                        children = {(props) => (<Form {...props}/>)}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit = { values => {
                            handleAddProject(values)
                        }}
                    >
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddProject
