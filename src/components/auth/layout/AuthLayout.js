import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import CustomRouterLink from './CustomRouterLink'
import Notification from '../../../utils/styledComponent/Notification'
import { Scrollbars } from 'react-custom-scrollbars';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    backgroundImage: `url(/projectManagement1.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    [theme.breakpoints.down("md")]: {
        overflow: 'scroll' 
    },
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF'
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
        display: 'none'
    }
  },
  cardRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //overflow: 'scroll',
    //padding: theme.spacing(3),
    //marginTop: theme.spacing(10),
    height: "90%",
    width: "100%",
    // marginLeft: theme.spacing(40),
    // marginRight: theme.spacing(40),
    // marginBottom: theme.spacing(20),
    [theme.breakpoints.down("md")]: {
        margin: theme.spacing(0),
        height: "150%",
        width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
        margin: '15px'
    },
    [theme.breakpoints.up("xl")]: {
        marginTop: theme.spacing(50)
    },
  },
  card: {
    //height: "90%",
    width: "60%",
    // marginLeft: theme.spacing(40),
    // marginRight: theme.spacing(40),
    // marginBottom: theme.spacing(20),
    [theme.breakpoints.down("md")]: {
        margin: theme.spacing(0),
        width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
        //margin: '15px'
    },
    [theme.breakpoints.up("xl")]: {
        marginTop: theme.spacing(50)
    },
  },
  cardHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center !important'
  },
  cardSubHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    textAlign: 'center !important'
  }
}));



function AuthLayout(props) {
    const classes = useStyles();
    const [isLoginPage] = useState((props.match) && (props.match.path === '/login'));
    const preventDefault = (event,path) => {
        event.preventDefault();
        props.history.push(path);
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: 'transparent',boxShadow: 'none'}}>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h3" className={classes.title}>
                    News
                </Typography>
                {
                    !isLoginPage ? 
                        <React.Fragment>
                            <Link 
                                href="/signup" 
                                onClick={(e) => preventDefault(e,'/login')} 
                                variant="body1" 
                                className={classes.link}
                                underline = 'none'
                            >
                                Already have an account?
                            </Link>
                            <Button variant="contained" to={'/login'} component={CustomRouterLink}>Login</Button>
                        </React.Fragment>
                         : 
                        <React.Fragment>
                            <Link 
                                href="/signup" 
                                onClick={(e) => preventDefault(e,'/signup')} 
                                variant="body1" 
                                className={classes.link}
                                underline = 'none'
                            >
                               Create new account?
                            </Link>
                            <Button variant="contained" to={'/signup'} component={CustomRouterLink}>Signup</Button>
                        </React.Fragment>
                    }
                
                
                </Toolbar>
            </AppBar>
            <Scrollbars
                autoHide
                autoHideDuration={200}
                thumbSize={50}
            >
                <div className={classes.cardRoot}>
                <Card  style={props.width && {width: props.width}} className={classes.card}>
                    <CardContent>
                        <div className={classes.cardHeader}>
                            <Typography variant="h2">
                                {props.title}
                            </Typography>
                        </div>
                        {props.subtitle && <div className={classes.cardSubHeader}>
                            <Typography variant="h4" color="textSecondary">
                                Get started with Project Management
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                Manage your project with agility
                            </Typography>
                        </div>}
                    
                            <div>
                                {props.children}    
                            </div>
                        
                    </CardContent>
                    
                </Card>
                </div>
            </Scrollbars>
            <Notification />
        </div>
    )
}


export default AuthLayout
