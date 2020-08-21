import React,{useState,useEffect} from 'react'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles'
import { apiCall } from '../../../utils/apiCall'
import useNotification from '../../../hooks/useNotification';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
}));


function TeamMembers(props) {

    //console.log('Props',props.managers)
    const{
        tableRef,
        data
    } = props
    const classes = useStyles();
    const [managers,setManagers] = useState(data.managers !== undefined ? data.managers : [])
    const [developers,setDevelopers] = useState(data.developers !== undefined ? data.developers : [])
    const [setNotification] = useNotification();
    useEffect(() => {
        if(data.managers !== undefined){
            setManagers([...data.managers])
        }
        if(data.developers !== undefined){
            setDevelopers([...data.developers])
        }
    }, [data.managers,data.developers])
    
    const handleDelete = (value) => {
        
        const options = {
            method: 'post',
            url: '/teams/detachEmployee',
            data: {
                data: {
                    id: value.id,
                    team: data.team,
                    role: value.role
                }
            }
        }

        apiCall(options).then((response) => {
            const notificationOptions = {
                open: true,
                message: 'Employee has been unassigned!',
                type: 'success'
            }
            if(value.role === "2"){
            
                setManagers((managers) => managers.filter((manager) => manager.id !== value.id))
            }
            if(value.role === "3"){
                setDevelopers((developers) => developers.filter((developer) => developer.id !== value.id))
            }
            
            setNotification(notificationOptions);
            tableRef && tableRef.current.onQueryChange()
        }).catch((error) => {

        })
    }
    
    return (
        <div className={classes.root}>
            {managers && managers.length > 0 && managers.map((manager,index) => {
               return(
                    <Chip
                        color="primary"
                        label = {manager.name}
                        key={index}
                        size="small"
                        onDelete={() => handleDelete(manager)}
                    />
                ) 
            })}
            {developers && developers.map((developer,index) => {
                 return(
                    <Chip 
                        color="secondary"
                        label = {developer.name}
                        key={index} 
                        size="small"
                        onDelete={() => handleDelete(developer)}
                    />
                ) 
            })}
        </div>
    )
}

export default TeamMembers
