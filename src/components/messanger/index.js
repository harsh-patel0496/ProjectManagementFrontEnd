import React,{ useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';

import SidebarNav from './SidebarNav'
import Messages from './Messages'
import SendMessage from './sendMessage'

import { apiCall } from '../../utils/apiCall'
import useAuthentication from '../../hooks/useAuthentication';
import useMessanger from '../../hooks/useMessanger';

const drawerWidth = 300;

export const ChatContext = React.createContext()

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position:'relative',
    height: "100%"
  },
  appBar: {
    marginTop: "64px",
    width: `calc(100% - ${drawerWidth + 240}px)`,
    backgroundColor: "#F8F9FA",
    //marginLeft: 470,
    //boxShadow: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: "64px",
    marginLeft:241,
    width: drawerWidth,
    //backgroundColor: "#F8F9FA"
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  profile:{
    padding: '1rem',
    backgroundImage: `url(/SidebarBackgound.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  media:{
    display: 'flex',
    alighItems: 'flex-start'
  },
  alignItemCenter:{
      alignItems: 'center !important'
  },
  mediaBody: {
    flex: 1,
    marginTop: ".25rem !important",
    marginLeft: "1rem !important",
    color: "white"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  largeAvtar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  drawerroot: {
    //backgroundImage: `url(/SidebarBackgound.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
}));

function Messanger(props) {
  const { className,...rest } = props;
  const classes = useStyles();
  
  const [messagesFromRudux,setMessageToRedux] = useMessanger();
  const [selectedChat,setSelectedChat] = useState({});
  const [friends,setFriends] = useState([])
  const [user] = useAuthentication()
  const [isLoading,setIsLoading] = useState(false)
  const [messages,setMessages] = useState([...props.messages])
  const scrollbars = useRef(null);

  console.log('totalMessages',props.messages)
  useEffect(() => {
    const options = {
      method: 'get',
      url: `/messages/getFriendList`,
      
    }

    setIsLoading(true)
    apiCall(options).then((response) => {
      
      if(response.data && response.data.friends){
        setFriends(response.data.friends)
        setSelectedChat(response.data.friends[0])
      }
      setIsLoading(false)
      console.log(response)

    }).catch((error) => {

      setIsLoading(false)
      console.log(error)

    })

  },[])
  
  const ChatContextValue = {
    selectedChat,
    setSelectedChat,
    user,
    friends,
    setFriends,
    isLoading,
    messages: props.messages,
    setMessages,
    messagesFromRudux,
    setMessageToRedux,
    scrollbars
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {selectedChat && selectedChat.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={`${classes.profile}`} >
            <div className={`${classes.media} ${classes.alignItemCenter}`}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.largeAvtar}/>
                <div className={classes.mediaBody}>
                    <Typography variant="h3" color="inherit">
                        John Doe
                    </Typography>
                </div>
            </div>
        </div>
        <div
          {...rest}
          className={clsx(classes.drawerroot, className)}
        >
        
          <ChatContext.Provider value={ChatContextValue}>
            <SidebarNav />
          </ChatContext.Provider>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ChatContext.Provider value={ChatContextValue}>
          <Messages />
          <SendMessage />
        </ChatContext.Provider>
        

      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      messages: state.messanger && state.messanger.messages
  }
}

export default connect(mapStateToProps)(Messanger)