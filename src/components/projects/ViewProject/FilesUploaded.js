import React from 'react'
import  { Card,CardContent,CardHeader, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

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

function FilesUploaded(props) {
    
    const classes = useStyles();
    const { description } = props
    return (
        <Card className={classes.root}>
            <CardHeader
                title = {
                        <Typography variant="h3" className={classes.title}>
                            Files Uploaded
                        </Typography>
                }
                //subheader= {<Typography variant="h5" className={classes.subtitle}>This is a short description on this project.</Typography>}
            >
            </CardHeader>
            <CardContent>
                {/* <Typography variant="body1" className={classes.subtitle} >
                    {description}
                </Typography> */}
            </CardContent>
        </Card>
    )
}

export default FilesUploaded
