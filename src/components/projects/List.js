import React from 'react'
import Project from './Project'
import Grid from "@material-ui/core/Grid";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3)
    }
  }));
function List(props) {
    const list = [1,2,3,4,5,6,7,8,9,10]
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
            {list.map((el,index) => {
                return (
                    <Grid item md={3} sm={6} xs={12} key = {index}>
                        <Project {...props} bg={index}/>
                    </Grid>
                )
            })}
            </Grid>
        </div>
    )
}

export default List
