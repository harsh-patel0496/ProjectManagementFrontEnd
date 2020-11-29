//import React from 'react'
import {  withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SubmitButton = withStyles((theme) => ({
    root: {
      //color: theme.palette.info.main,
      backgroundColor: "#5D92F4",
      '&:hover': {
        backgroundColor: "#407ef2",
      },
    },
}))(Button);

export default SubmitButton