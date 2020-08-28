import React,{useState,useEffect} from 'react'
import { apiCall } from '../../../utils/apiCall'
import  { Card,CardContent,CardHeader, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';

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
    },
    listItem: {
        paddingLeft: 0
    }
  }));

function Comments(props) {
    const classes = useStyles();
    const {
        project
    } = props
    const [comments,setComments] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const options = {
            method: 'get',
            url: `/comments/${project}`
        }
        setLoading(true)
        apiCall(options).then( response => {
            if(response.data && response.data.comments){
                setLoading(false)
                setComments(response.data.comments)
            }
        }).catch( error => {
            setLoading(false)
            console.log(error)
        })
    },[])
    return (
        <Card className={classes.root}>
            <CardHeader
                title = {
                        <Typography variant="h3" className={classes.title}>
                            Comments
                        </Typography>
                }
                //subheader= {<Typography variant="h5" className={classes.subtitle}>This is a short description on this project.</Typography>}
            >
            </CardHeader>
            <CardContent>
                <List className={classes.listItem}>
                    {loading ? 
                        <center>
                            <CircularProgress className={classes.loader}/>
                        </center> : comments.length > 0 ? 
                            comments.map((comment,index) => {
                                return (
                                    <React.Fragment>
                                        <ListItem alignItems="flex-start" className={classes.listItem}>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={comment.users.name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {comment.comment}
                                                        </Typography>
                                                        
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                )
                            }) : 
                            <center>
                                <Typography
                                    component="span"
                                    variant="h5"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    No Data Found!
                                </Typography>
                            </center>
                        }
                    </List>
            </CardContent>
        </Card>
    )
}

export default Comments
