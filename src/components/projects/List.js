import React,{useState,useEffect} from 'react'
import Project from './Project'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import  { Card,CardContent,CardHeader, Typography } from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SubmitButton from '../../utils/styledComponent/SubmitButton'
//import Drawer from '@material-ui/core/Drawer';
import AddProject from './AddProject'
import EditProject from './EditProject'
import DrawerLayout from './DrawerLayout'
import { apiCall } from '../../utils/apiCall'
import DialogComponent from '../../utils/styledComponent/DialogComponent'
import AddComment from './AddComment'
import CommentList from './CommentList'
import useProject from '../../hooks/useProject'
import useComponentLoader from '../../hooks/useComponentLoader'

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
    const classes = useStyles();
    const [isOpen,setIsOpen] = useState(false)
    const [projects,setProjects] = useState([]);
    const [selectedProject,setSelectedProject] = useState({});
    const [isOpenEditDrawer,setIsOpenEditDrawer] = useState(false)
    const [isOpenAddCommentDialog,setIsOpenAddCommentDialog] = useState(false)
    const [isOpenListCommentDialog,setIsOpenListCommentDialog] = useState(false)

    const [projectFromRudux,setProjectToRedux] = useProject();
    const [setLoader] = useComponentLoader();

    const handleEditProject = (project,index) => {
        toggleDrawer('edit')
        setSelectedProject({project,index})
    }

    const handleAddComment = (project,index) => {
        setIsOpenAddCommentDialog(true)
        setSelectedProject({project,index})
    }

    const handleViewComment = (project,index) => {
        setIsOpenListCommentDialog(true)
        setSelectedProject({project,index})
    }

    const handleViewProject = (project,index) => {
        setProjectToRedux(project)
        setSelectedProject({project,index})
        props.history.push(`/projects/view/${project.id}`)
    }

    const handleAddTask = (project,index) => {
        setProjectToRedux(project)
        setSelectedProject({project,index})
        props.history.push(`/tasks/${project.id}`)
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
                    setLoader({open:false})
                }
                
            }).catch( error => {
                setLoader({open:false})
            })
        }
    },[projects,setLoader])

    const ProjectContextValue = {
        projects,
        setProjects,
        toggleDrawer,
        selectedProject,
        setSelectedProject,
        isOpenEditDrawer,
        setIsOpenEditDrawer,
        handleEditProject,
        handleAddComment,
        handleViewComment,
        handleViewProject,
        handleAddTask,
        isOpenAddCommentDialog,
        setIsOpenAddCommentDialog,
        isOpenListCommentDialog,
        setIsOpenListCommentDialog,
        projectFromRudux
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
                        title = {<Typography variant="h2" >Projects</Typography>}
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
                                    <Grid item md={4} sm={6} xs={12} key = {index}>
                                        <Project 
                                            {...props} 
                                            bg={index}
                                            index={index} 
                                            project={project}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </CardContent>
                </Card>

                {isOpenAddCommentDialog && <DialogComponent 
                    isOpen= {isOpenAddCommentDialog} 
                    setOpen={setIsOpenAddCommentDialog}
                    title={`Add Comment`}
                    footerActions={false}
                    maxWidth="sm"
                >
                    <AddComment />
                </DialogComponent>
                
                }

                {isOpenListCommentDialog && <DialogComponent 
                    isOpen= {isOpenListCommentDialog} 
                    setOpen={setIsOpenListCommentDialog}
                    title={`Comments`}
                    footerActions={false}
                    maxWidth="sm"
                >
                    <CommentList />
                </DialogComponent>
                
                }
            </ProjectContext.Provider>
        </div>
    )
}

export default List
