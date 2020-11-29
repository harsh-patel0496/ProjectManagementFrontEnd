import React, {useEffect} from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditProfile from './EditProfile';
import Clients from '../clients'
import Employees from '../employees'
import Team from '../teams'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { 
    //Paper,
    Tabs,
    Tab, 
    Divider,
Grid} from '@material-ui/core';
import TabPanel from './TabPanel'
import Avatar from '@material-ui/core/Avatar';
import useAuthentication from '../../../hooks/useAuthentication';
const useStyles = makeStyles((theme) => ({
    root: {
        //padding: theme.spacing(4),
        margin: theme.spacing(4),
        //zIndex: 1000
      },
    media: {
        height: 200,
        [theme.breakpoints.down('md')]: {
            height: 0,
        }
      
    },
    indicator: {
        backgroundColor: "#5D92F4"
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    avtar: {
        marginLeft: theme.spacing(5),
        width:"auto",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    title: {
        //display: 'flex',
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryText: {
        color: 'white',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
        //display: 'flex',
        //justifyContent: 'center',
        //alignItems: 'center'
        
    },
    secondryText: {
        color: 'white',
        marginTop: theme.spacing(0),
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
        //display: 'flex',
        //justifyContent: 'center',
        //alignItems: 'center'
        
    }
  }));

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
function Profile(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const [user] = useAuthentication();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("resize"));
      }, []);
    return (
        <div className={classes.root}>
            <Card >
                <CardMedia
                    className={classes.media}
                    image="/SidebarBackgound.png"
                    title="Contemplative Reptile"
                    children={
                        <div className={classes.avtar}>
                            <Grid
                                container
                                //spacing={3}
                                //width={50}
                            >
                                <Grid
                                    item
                                >
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
                                </Grid>
                                <Grid
                                    item
                                >
                                    <Typography variant="h3" className={classes.primaryText} gutterBottom>{user.name}</Typography>
                                    <Typography variant="body1" className={classes.secondryText}>{user.email}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    }
                />
                <CardContent>
                    {user.role === "0" ? 
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary" 
                            classes={{ indicator: classes.indicator }}
                            textColor="primary"
                            //variant="fullWidth"
                            //aria-label="full width tabs example"
                        >
                            <Tab 
                                label="My Profile" 
                                icon={<PersonOutlineIcon />}
                                {...a11yProps(0)} 
                            />
                            <Tab 
                                label="Customers" 
                                icon = {<PeopleOutlineIcon />}
                                {...a11yProps(1)} 
                            />
                            <Tab 
                                label="Managers" 
                                icon = {<AssignmentIndIcon />}
                                {...a11yProps(2)} 
                            />
                            <Tab 
                                label="Developers" 
                                icon = {<PeopleOutlineIcon />}
                                {...a11yProps(3)} 
                            />
                            <Tab 
                                label="TEams" 
                                icon = {<GroupWorkIcon />}
                                {...a11yProps(4)} 
                            />
                            
                        </Tabs> : 
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary" 
                            classes={{ indicator: classes.indicator }}
                            textColor="primary"
                            //variant="fullWidth"
                            //aria-label="full width tabs example"
                            >
                            <Tab 
                                label="My Profile" 
                                icon={<PersonOutlineIcon />}
                                {...a11yProps(0)} 
                            />
                        </Tabs>
                    }
                    
                    <Divider />
                    
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <EditProfile {...props}/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Clients {...props} role={1}/>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <Employees {...props} role={2} label="Managers"/>
                        </TabPanel>
                        <TabPanel value={value} index={3} dir={theme.direction}>
                            <Employees {...props} role={3} label="Developers"/>
                        </TabPanel>
                        <TabPanel value={value} index={4} dir={theme.direction}>
                            <Team {...props} label="Team"/>
                        </TabPanel>
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile
