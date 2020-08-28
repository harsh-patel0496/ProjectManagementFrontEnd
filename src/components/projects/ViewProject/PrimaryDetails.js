import React,{useState} from 'react'
import  { Card,CardContent,CardHeader, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
    },
    listItem: {
        position: 'relative',
        textAlign: "left",
        alignItems: "center",

        display: "flex !important",
        justifyContent: "space-between !important"
    },
    nested: {
        paddingLeft: theme.spacing(4),
      },
  }));

function PrimaryDetails(props) {
    
    const classes = useStyles();
    const { project } = props

    const [openTeamList,setOpenTeamList] = useState(false);
    return (
        <Card className={classes.root}>
            {/* <CardHeader
                title = {
                        <Typography variant="h3" className={classes.title}>
                            Description
                        </Typography>
                }
                subheader= {<Typography variant="h5" className={classes.subtitle}>This is a short description on this project.</Typography>}
            >
            </CardHeader> */}
            <CardContent>
                <List>
                    <ListItem alignItems="flex-start" className={classes.listItem}>
                        <ListItemText
                            secondary={
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        Client : 
                                    </Typography>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                            >
                                {project.client && project.client.name}
                            </Typography>
                       
                        </ListItemSecondaryAction>
                    </ListItem>
                    
                    <Divider />
                    <ListItem alignItems="flex-start" className={classes.listItem}>
                        <ListItemText
                            secondary={
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        Total Tasks : 
                                    </Typography>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                            >
                                {project.tasks_count && project.tasks_count}
                            </Typography>
                        
                        </ListItemSecondaryAction>
                    </ListItem>
                    
                    <Divider />
                    <ListItem alignItems="flex-start" className={classes.listItem}>
                        <ListItemText
                            secondary={
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        Total Teams : 
                                    </Typography>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                            >
                                {project.teams && project.teams.length}
                            </Typography>
                        
                        </ListItemSecondaryAction>
                    </ListItem>
                    
                    <Divider />
                    <ListItem alignItems="flex-start" className={classes.listItem}>
                        <ListItemText
                            secondary={
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        Work Force : 
                                    </Typography>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                            >
                                {project.totalTeamMembers && project.totalTeamMembers}
                            </Typography>
                        
                        </ListItemSecondaryAction>
                    </ListItem>
                    
                    <Divider />
                    <ListItem button onClick={() =>{setOpenTeamList(!openTeamList)}}>
                        <ListItemText 
                            secondary={
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                >
                                   Teams 
                                </Typography>
                            }
                        />
                        {openTeamList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openTeamList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {project.teams && project.teams.map((team,index) => {
                                return (
                                    <ListItem button className={classes.nested}>
                                        <ListItemText 
                                            primary={team.name} 
                                        />
                                    </ListItem>
                                )
                            })}
                            
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItem alignItems="flex-start" className={classes.listItem}>
                        <ListItemText
                            secondary={
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        Start Date : 
                                    </Typography>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                            >
                                {project.start_date && project.start_date}
                            </Typography>
                        
                        </ListItemSecondaryAction>
                    </ListItem>
                    
                    <Divider />
                    
                    
                    
                </List>
            </CardContent>
        </Card>
    )
}

export default PrimaryDetails
