import React,{
    useState,
    useEffect,
    useReducer
} from 'react'
import { makeStyles } from '@material-ui/core/styles';

//MUI Components
import {
    Grid,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';


import { Divider } from '@material-ui/core'
import RootRef from "@material-ui/core/RootRef";

//React drag and drop component
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd"

//Utiles(functions and static values)
import { apiCall } from '../../utils/apiCall'
import { connect } from 'react-redux';
import { selectContainer,getKeyOrIndex,reorder,getNewPriority } from './utils/actions'
import {initialState} from './utils/initialState'

//Css
import { useStyleTaskComponent } from '../../assets/css/taskComponent';

//Custom component
import AddTask from './AddTask'
import TaskMenu from './TaskMenu'
import Ticket from './Ticket'
import DialogComponent from '../../utils/styledComponent/DialogComponent'

//Custome Hooks
import useProject from '../../hooks/useProject'
import useNotification from '../../hooks/useNotification';

const useStyles = useStyleTaskComponent;


export const TaskContext = React.createContext();

function Task(props) {
    const {project} = props
    const [projectFromRudux,setProjectToRedux] = useProject();
    const [setNotification] = useNotification();
    const defaultState = {
        to_do: {
            slug: 'to_do',
            title: 'To Do',
            tasks: []
        },
        in_progress: {
            slug: 'in_progress',
            title: 'In Progress',
            tasks: []
        },
        completed: {
            slug: 'completed',
            title: 'Completed!',
            tasks: []
        }
    }
    const reducer = (state, action) => {
        switch(action.type){
            case 'REFRESH':
                return {
                    ...defaultState
                }
            default:
                return {
                    ...state, 
                    [action.type]:{
                        ...state[action.type],
                        tasks: [...action.tasks]
                    }
                }
        }
        
    }
    const classes = useStyles();
    const [containers, dispatch] = useReducer(reducer,initialState)
    const [selectedContainer,setSelectedContainer] = useState(1);
    const [openAddTaskDialog,setOpenAddTaskDialog] = useState(false)

    
    
    const handleOpenAddTaskDialog = (container) => {
        setOpenAddTaskDialog(true)
        setSelectedContainer(getKeyOrIndex(null,container))
        //handleMenuClose()
    }

    const handleCloseAddTaskDialog = () => {
        setOpenAddTaskDialog(false)
    }

    const handleStop = (result) => {
        if (!result.destination) {
            return;
        }
        const {
            source,
            destination
        } = result
        const selectedContainers = selectContainer(source,destination,containers)
        let sourceTask = selectedContainers.source.tasks;
        let destinationTask = selectedContainers.destination.tasks;
        const [removed] = sourceTask.splice(source.index,1);
        

        const destinationId = getKeyOrIndex(null,destination.droppableId)
        destinationTask.splice(destination.index,0,{...removed,type:destinationId });
        const newPriority = getNewPriority(destinationTask);
        const options = {
            method: 'put',
            url: `/tasks/${removed.id}`,
            data: {
                data:{
                    ...removed,destinationType: destinationId,newPriority
                }
            }
        }

        apiCall(options).then((response) => {
            reorder({ 
                source,
                destination,
                sourceTask,
                destinationTask,
                dispatch
            })
            const notificationOptions = {
                open: true,
                message: 'State Updated successfully!',
                type: 'success'
            }
            setNotification(notificationOptions);
            //console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleAddTask = (values) => {
        let data = {...values,type: selectedContainer,project: projectFromRudux.id}
        const container  = getKeyOrIndex(selectedContainer)
        const options = {
            laraApp: true,
            method: 'post',
            url: '/tasks',
            data: {
                data
            }
        }
        apiCall(options).then((response) => {
            dispatch({type: 'REFRESH'})
            Object.keys(response.data.tasks).map((key,index) => {
                let container;
                container = getKeyOrIndex(key)
                dispatch({type: container,tasks: response.data.tasks[key]})
            })
            const notificationOptions = {
                open: true,
                message: 'Task added successfully!',
                type: 'success'
            }
            setNotification(notificationOptions);
            handleCloseAddTaskDialog()
            //console.log(response)
        }).catch((error) => {
            console.log(error)
        })
        console.log(data)
    }

    useEffect(() => {
        
        if(props.history && props.history.action == "POP"){
            props.history.push('/projects')
        } else {
            const options = {
                method: 'get',
                url: `/tasks/${projectFromRudux.id}`,
            }
    
            apiCall(options).then(response => {
                
                dispatch({type: 'REFRESH'})
                Object.keys(response.data.tasks).map((key,index) => {
                    let container;
                    container = getKeyOrIndex(key)
                    dispatch({type: container,tasks: response.data.tasks[key]})
                })
            }).catch( error => {
    
            })
        }
        
    },[]);

    

    const contextValue = {
        handleOpenAddTaskDialog,
        handleAddTask,
        openAddTaskDialog,
        handleCloseAddTaskDialog
    } 
    //console.log(containers)
    return (
        <div className={classes.rootDiv}>
            <Card>
                <CardHeader
                    title = {<Typography variant="h4" >Tasks</Typography>}
                    subheader= {<Typography variant="body1" >Project: {projectFromRudux.title}</Typography>}
                    // action = {
                    //     <SubmitButton
                    //         variant="contained"
                    //         color="primary"
                    //         type="submit"
                    //         endIcon={<PlaylistAddIcon />}
                    //         onClick={() => toggleDrawer()}
                    //     >
                    //         Add New Project
                            
                    //     </SubmitButton>
                    // }
                />
                <CardContent>
                    <DragDropContext onDragEnd={ handleStop } >
                        <TaskContext.Provider value={contextValue}>
                            <Grid
                                container
                                spacing={0}
                            >
                                {Object.keys(containers).map((key,index) => {
                                    return (
                                        <Grid
                                            item
                                            md={4}
                                            xs={12}
                                            key = {index}
                                        >
                                            <Droppable droppableId={key}>
                                                {(provided, snapshot) => (
                                                    <RootRef rootRef={provided.innerRef}>
                                                        <Card 
                                                            className={classes.rootCard}
                                                            variant="outlined"
                                                        > 
                                                            <CardHeader 
                                                                title={containers[key].title}
                                                                //subheader="September 14, 2016"
                                                                action={
                                                                    <TaskMenu container={key}/>
                                                                }
                                                                className = {classes.classPedding}
                                                            />
                                                            <Divider />
                                                            {containers[key].tasks.map( (task,index) => {
                                                                return (
                                                                    <Ticket 
                                                                        index = {index}
                                                                        task = {task}
                                                                        classes = {classes}
                                                                        key = {index}
                                                                    />
                                                                )
                                                                
                                                            })}
                                                            {provided.placeholder}
                                                        </Card>
                                                    </RootRef>
                                                    
                                                )}
                                                
                                            </Droppable>
                                            {/* {openAddTaskDialog && 
                                                <AddTask />
                                            } */}
                                            {openAddTaskDialog && 
                                                <DialogComponent 
                                                    isOpen= {openAddTaskDialog} 
                                                    setOpen={setOpenAddTaskDialog}
                                                    title={`Add Task`}
                                                    footerActions={false}
                                                    maxWidth="sm"
                                                >
                                                    <AddTask />
                                                </DialogComponent>
                                            
                                            }
                                        </Grid>
                                    )
                                })}
                            </Grid> 
                        </TaskContext.Provider>
                    </DragDropContext>
                </CardContent>
            </Card>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         token: state.laraAuth.app.token,
//       }
// }

export default Task
