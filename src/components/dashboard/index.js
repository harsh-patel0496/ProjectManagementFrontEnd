import React,{useState,useEffect} from 'react'
import { Budget } from './information/Budget'
import { TotalManagers }  from './information/TotalManagers'
import { TotalDevelopers }  from './information/TotalDevelopers'
import { TotalProjects }  from './information/TotalProjects'
import { LatestTasks } from './information/LatestTasks'
import Layout from './information/Layout'
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { apiCall } from '../../utils/apiCall'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    }
}));

export const DashboardContext = React.createContext(); 

function Dashboard(props) {

    const classes = useStyles();
    const [primaryInfo,setPrimaryInfo] = useState({})

    useEffect(() => {
        const options = {
            method: 'get',
            url: '/users/assembly'
        };

        apiCall(options).then(response => {
            if(response.data){
                let info = {
                    clientsCount: response.data.assembly.clients_count,
                    managersCount: response.data.assembly.managers_count,
                    developersCount: response.data.assembly.developers_count
                }
                setPrimaryInfo({...info});
            }
        }).catch( error => {
            console.log(error)
        })
    },[])

    const DashboardContextValue = {
        primaryInfo
    }
    return (
        <DashboardContext.Provider value={DashboardContextValue}>
            <div className={classes.root}>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Budget {...props} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalManagers {...props} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalDevelopers {...props} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalProjects {...props} />
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                    >
                        <LatestTasks />
                    </Grid>
                </Grid>
            
            </div>
        </DashboardContext.Provider>
    )
}

export default Dashboard
