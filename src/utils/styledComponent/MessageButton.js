//import React from 'react'
import {  withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MessageButton = withStyles((theme) => ({
    root: {
      //color: theme.palette.info.main,
      backgroundColor: "#5D92F4",
      borderRadius: "50px",
      
      paddingTop:"0.25rem",
      paddingBottom:"0.25rem",
      marginTop:"1%",
      '&:hover': {
        backgroundColor: "#407ef2",
      },
    },
}))(Button);

export default MessageButton