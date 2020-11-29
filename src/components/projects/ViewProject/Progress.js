import React from 'react'
import BorderLinearProgress from '../../../utils/styledComponent/BorderLinearProgress'
import  { Card,CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    }
  }));

function Progress(props) {
    
    const classes = useStyles();
    const { progress } = props
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5">
                    Progress : {`${Math.round(progress)}%`}
                </Typography><br />
                <BorderLinearProgress variant="determinate" value={Math.round(progress)}/>
            </CardContent>
        </Card>
    )
}

export default Progress
