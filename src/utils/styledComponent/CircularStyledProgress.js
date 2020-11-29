import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
    bottom: {
      color: "white",
    },
    top: {
      color: 'white',
      animationDuration: '550ms',
      position: 'relative',
      margin: 0,
      padding: 0
    },
    circle: {
      strokeLinecap: 'round',
    },
    buttonProgress: {
      animationDuration: '550ms',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -10
    },
  }));

function CircularStyledProgress(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
            <CircularProgress
                variant="indeterminate"
                disableShrink
                
                className={classes.buttonProgress}
                size={20}
                thickness={4}
                {...props}
            />
        </div>
    )
}


export default CircularStyledProgress
