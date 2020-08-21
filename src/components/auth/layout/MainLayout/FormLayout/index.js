import React from 'react'
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';

function FormLayout(props) {
    
    const {
        margin,
        padding,
        header
    } = props

    const useStyles = makeStyles(theme => ({
        root: {
          padding: theme.spacing(margin),
          margin: theme.spacing(padding),
          minHeight: "100%"
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <Card
                className={classes.root}
            >
                {props.header && 
                    <React.Fragment>
                        <CardHeader
                            subheader={props.subheader}
                            title={props.title}
                        />
                        <Divider />
                    </React.Fragment>
                }
                
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </div>
    )
}

export default FormLayout
