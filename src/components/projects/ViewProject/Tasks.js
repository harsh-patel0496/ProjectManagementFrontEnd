import React,{
    useState,
    useEffect,
    //useReducer
} from 'react'
import MaterialTable,{ 
    MTableToolbar,
    //MTableHeader 
} from 'material-table'
import  { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { apiCall } from '../../../utils/apiCall'
import TaskStatus from './TaskStatus'
const useStyles = makeStyles((theme) => ({
    
    root:{
        marginBottom: theme.spacing(3)
    },
    title:{
        fontSize:"1.4rem !important",
        fontWeight: 500
    },
    subtitle: {
        fontSize:"1.0rem !important",
        fontWeight: 500
    },
    body: {
        fontSize:"1.0rem !important",
    }
  }));

function Tasks(props) {
    
    const classes = useStyles();
    const { project } = props
    const tableRef = React.createRef()
    const [tasks,setTasks] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {

        const options = {
            method: 'get',
            url: `/tasks/${project.id}/project`
        };
        setIsLoading(true)
        apiCall(options).then( response => {
            const tasks = response.data.tasks
            setTasks(tasks)
            setIsLoading(false)
        }).catch( error => {
            console.log(error)
            setIsLoading(false)
        })

    },[])
    return (
        <MaterialTable
            
            tableRef={tableRef}
            columns={[
                { title: 'Name', field: 'name' },
                { 
                    title: 'Description', 
                    field: 'description'
                },
                { 
                    title: 'Status', 
                    field: 'type',
                    render : rowData => <TaskStatus task={rowData}/>
                }
            ]}
            data={ tasks }
            editable={{
                // onRowUpdate: (newData, oldData) =>{
                    
                //     return new Promise((resolve, reject) => {
                //         console.log('newData',newData)
                //         resolve()
                //     })
                // },
                // onRowDelete: oldData => {
                //     return new Promise((resolve,reject) => {
                //         const options = {
                //             method: 'delete',
                //             url: `/teams/${oldData.id}`
                //         }
                //         apiCall(options).then((response) => {
                //             const notificationOptions = {
                //                 open: true,
                //                 message: 'Team has been deleted!',
                //                 type: 'success'
                //             }
                //             resolve()
                //         }).catch((error) => {
                //             resolve()
                //         })
                //     })
                // }
                }}
            components={{
                Toolbar: props => (
                    <div>
                    <MTableToolbar {...props} />
                    </div>
                )
                }}
            title = {
                <Typography variant="h3" className={classes.title}>
                    Tasks
                </Typography>
            }
            style={{padding: "2%"}}
            isLoading={isLoading}
            // options={{
            //     selection: true
            // }}
            // actions={[
            //     {
            //         icon: 'edit',
            //         tooltip: 'Edit Costomer',
            //         onClick: (employee, rowData) => { 
            //             dispatch({ type:"TOGGLE_EDIT" })
            //             dispatch({ type: "SET_TEAM",team:rowData }) 
            //             dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
            //         }
            //     },
            //     {
            //         icon: 'add',
            //         tooltip: 'Add User',
            //         isFreeAction: true,
            //         onClick: (event) => {
            //             dispatch({ type: "SET_TABLE_REF",tableRef: tableRef.current})
            //             setOpenAddTeamDialog(true)
            //         }
            //         },
            //         {
            //         icon: 'refresh',
            //         tooltip: 'Refresh Data',
            //         isFreeAction: true,
            //         onClick: () => tableRef.current && tableRef.current.onQueryChange(),
            //         }
            // ]}
            
        />
    )
}

export default Tasks
