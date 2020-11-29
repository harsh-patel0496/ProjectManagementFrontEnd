import React, { useContext,useState } from 'react';
//import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem,ListItemAvatar,ListItemText, colors,Avatar } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { ChatContext } from './index'
import CircularProgress from '@material-ui/core/CircularProgress';
//import { initiateChatRoom } from '../../utils/initiateChannel'

const useStyles = makeStyles(theme => ({
    root: {
      //overflowY: 'scroll'
    },
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    button: {
      marginTop: '5px',
      color: colors.blueGrey[800],
      //color: 'white',
      padding: '10px 8px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
      color: theme.palette.primary.main,
      //color: 'white',
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
    active: {
      backgroundColor:'rgba(99, 128, 156,0.5)',
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: 'white'  
      },
      '&:hover': {
        backgroundColor:'rgba(99, 128, 156,1)',
      },
    }
  }));
  
  // const CustomRouterLink = forwardRef((props, ref) => (
  //   <div
  //     ref={ref}
  //     style={{ flexGrow: 1 }}
  //   >
  //     <RouterLink {...props} />
  //   </div>
  // ));

function SidebarNav(props) {

    const {className,rest} = props
    const classes = useStyles();
    const [selectedIndex,setSelectedIndex] = useState(0);

    const {
        //user,
        isLoading,
        friends,
        setSelectedChat
    } = useContext(ChatContext)

    const handleListItemClick = (e,index,friend) => {
        e.preventDefault();
        setSelectedIndex(index)
        setSelectedChat(friend)
    }
    
    return (
        <Scrollbars
            autoHide
            autoHideDuration={200}
            thumbSize={50}
        >
            <List
                {...rest}
                className={clsx(classes.root, className)}
            >   
                {isLoading && 
                    <center>
                        <CircularProgress />
                    </center>
                }
                {friends.map((friend,index) => {
                    return (
                        <ListItem
                            button
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index,friend)}
                        >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary={friend.name} secondary={friend.chated_at} />
                        </ListItem>
                    )
                })}
                
            </List>
        </Scrollbars>
    )
}

export default SidebarNav
