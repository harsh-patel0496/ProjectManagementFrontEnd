import React, {useState,useEffect,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ProjectContext } from '../List';
import { apiCall } from '../../../utils/apiCall'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    width: '100%',
    //maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    //display: 'inline',
  }
}));


function Comments(props) {
    const classes = useStyles();
    const [comments,setComments] = useState([])
    const [loading,setLoading] = useState(false)
    const {
        selectedProject,
    } = useContext(ProjectContext)

    useEffect(() => {
        const options = {
            method: 'get',
            url: `/comments/${selectedProject.project.id}`
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
    <List className={classes.root}>
        {loading ? <center><CircularProgress className={classes.loader}/></center> : comments.length > 0 ? comments.map((comment,index) => {
            console.log(comment)
            return (
                <React.Fragment>
                    <ListItem alignItems="flex-start">
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
            }) : <center>
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
  );
}

export default Comments
