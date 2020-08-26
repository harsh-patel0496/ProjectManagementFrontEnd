import React,{useState,useEffect} from 'react'
import Project from './Project'
import Grid from "@material-ui/core/Grid";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import  { Card,CardContent,CardHeader } from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SubmitButton from '../../utils/styledComponent/SubmitButton'
import Drawer from '@material-ui/core/Drawer';
import AddProject from './AddProject'
import EditProject from './EditProject'
import DrawerLayout from './DrawerLayout'
import { apiCall } from '../../utils/apiCall'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(10),
        //height: '100% !important',
        overflow: 'hidden'
    },
    drawer: {
        height: '100% !important',
        overflow: 'hidden',
        width: "50%"
    },
    
}));

export const ProjectContext = React.createContext();
function List(props) {
    const list = [1,2,3,4,5,6,7,8,9,10]
    const classes = useStyles();
    const [isOpen,setIsOpen] = useState(false)
    const [projects,setProjects] = useState([]);
    const [selectedProject,setSelectedProject] = useState({});
    const [isOpenEditDrawer,setIsOpenEditDrawer] = useState(false)
    
    const handleEditProject = (project,index) => {
        toggleDrawer('edit')
        setSelectedProject({project,index})
    }

    const toggleDrawer = (module = 'add') => {
        if(module === 'add'){
            setIsOpen(!isOpen)
        } else if(module === 'edit'){
            setIsOpenEditDrawer(!isOpenEditDrawer)
        }
        
    }

    useEffect(() => {

        if(projects.length === 0){
            const options = {
                method: 'get',
                url: '/projects'
            }
            apiCall(options).then( response => {
                if(response.data && response.data.projects){
                    setProjects(response.data.projects)
                }
                
            }).catch( error => {

            })
        }
    },[projects])

    const ProjectContextValue = {
        projects,
        setProjects,
        toggleDrawer,
        selectedProject,
        setSelectedProject,
        isOpenEditDrawer,
        setIsOpenEditDrawer,
        handleEditProject
    };
    return (
        <div className={classes.root}>
           <ProjectContext.Provider value={ProjectContextValue}>
            {isOpen && <DrawerLayout 
                    anchor='right' 
                    open={isOpen} 
                    onClose={() => toggleDrawer('add')} 
                    classes={{
                        paper: classes.drawer,
                    }}
                >
                    <AddProject 
                        {...props} 
                        toggleDrawer={() => toggleDrawer('add')}
                        setProjects={setProjects}
                        projects={projects}
                    />
                </DrawerLayout>
            }
            {isOpenEditDrawer && <DrawerLayout 
                    anchor='right' 
                    open={isOpenEditDrawer} 
                    onClose={() => toggleDrawer('edit')} 
                    classes={{
                        paper: classes.drawer,
                    }}
                >
                    <EditProject 
                        {...props} 
                        toggleDrawer={() => toggleDrawer('edit')}
                        setProjects={setProjects}
                        projects={projects}
                    />
                </DrawerLayout>
            }
                <Card>
                    <CardHeader
                        title = "Projects"
                        action = {
                            <SubmitButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                endIcon={<PlaylistAddIcon />}
                                onClick={() => toggleDrawer()}
                            >
                                Add New Project
                                
                            </SubmitButton>
                        }
                    >
                    </CardHeader>
                    <CardContent>
                        <Grid container spacing={4}>
                            {projects.map((project,index) => {
                                return (
                                    <Grid item md={3} sm={6} xs={12} key = {index}>
                                        <Project {...props} bg={index} index={index} project={project}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </CardContent>
                </Card>
            </ProjectContext.Provider>
        </div>
    )
}

export default List
