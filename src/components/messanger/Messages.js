import React,{useEffect,useContext} from 'react'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ChatContext } from './index'
import { apiCall } from '../../utils/apiCall';
import { Scrollbars } from 'react-custom-scrollbars';
import { initiateChatRoom } from '../../utils/initiateChannel'

const useStyles = makeStyles((theme) => ({
    root:{
        height: "76%",
        overflow: "hidden"
    },
    rootRight: {
        display: "flex",
        flexDirection: 'row-reverse',
        width: "100%",
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    rootLeft: {
        display: "flex",
        flexDirection: 'row',
        width: "100%",
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    mediaBody: {
        alignSelf: 'flex-start',
        marginTop: ".50rem !important",
        color: "white"
    },
    chipLeft: {
        borderBottomLeftRadius: "0%",
        backgroundColor:"#E1EBFF",
        color: 'black'
    },
    chipRight: {
        borderBottomRightRadius: "0%"
    }
}));

function Messages(props) {

    const {
        user,
        selectedChat,
        messages,
        setMessages,
        setMessageToRedux,
        scrollbars
    } = useContext(ChatContext)

    const classes = useStyles();

    useEffect(() => {

        const options = {
            method: 'get',
            url: `/messages/${selectedChat.friendable_id}`
        }
        apiCall(options).then( response => {
            let is_team = selectedChat && selectedChat.friendable_type === "App\\Team" ? true : false;
            let channel = 'App.User.';
            if(is_team){
                channel = channel+selectedChat.friendable_id
            } else {
            let secret = user.id * selectedChat.friendable_id;
                channel = channel + (secret)
            }
            initiateChatRoom(channel,scrollbars)
            if(response.data && response.data.messages){
                setMessages([...response.data.messages])
                setMessageToRedux([...response.data.messages])
                scrollbars.current.scrollToBottom();
            }
        }).catch( error => {

        })
    },[selectedChat,scrollbars,setMessageToRedux,setMessages,user])

    return (
        
            <div className={classes.root}>
                <Scrollbars
                    autoHide
                    autoHideDuration={200}
                    thumbSize={50}
                    ref={scrollbars}
                >
                    {messages.map((message) => {
                        return(
                            <div className={message.sender_id === user.id ? classes.rootRight : classes.rootLeft}>
                                <Avatar alt={message.sender_id === user.id ? user.name : selectedChat.name} src="/static/images/avatar/1.jpg" />
                                <div className={classes.mediaBody}>
                                    <Chip 
                                        color="secondary"
                                        label = {message.message}
                                        key={0} 
                                        className={message.sender_id === user.id ? classes.chipRight : classes.chipLeft}
                                    />
                                    <Typography variant="body2" className={message.sender_id === user.id ? classes.rootRight : classes.rootLeft}>{message.created_at}</Typography>
                                </div>
                            </div>
                        )
                    })}
                </Scrollbars>
            </div>
        
    )
}

export default Messages
