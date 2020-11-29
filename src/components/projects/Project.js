import React,{useState,useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
//import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { CardHeader } from "@material-ui/core";
import { ProjectContext } from './List';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProjectMenu from './ProjectMenu'
import BorderLinearProgress from '../../utils/styledComponent/BorderLinearProgress'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%"
  },
  media: {
    height: 140
  },
  divider: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },
  cardContent:{
    //paddingTop: 0
  },
  primary: {
      //backgroundColor: "#eff2f5"
  },
  secondary: {
    backgroundColor: "#5D92F4"
  },
  ternary: {
    backgroundColor: "#43A047"
  },
  tour: {
    backgroundColor: "#FB8C00"
  },
  title:{
      color:"#5D92F4",
      fontSize:"1.1rem !important",
      fontWeight: 550
  },
  progress: {
    marginTop: theme.spacing(2)
  }
}));

export const MenuContext = React.createContext();

function Project(props) {
  const {project,index} = props
  const classes = useStyles();
  const background = [classes.primary,classes.secondary,classes.ternary,classes.tour]

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const {
    handleEditProject,
    handleAddComment,
    handleViewComment,
    handleViewProject,
    handleAddTask
  } = useContext(ProjectContext)
  
  const MenuContextValue = {
    anchorEl,
    setAnchorEl,
    handleAddComment,
    handleAddTask,
    project,
    index
  }
  return (
    <Card className={classes.root}>
      {/* <CardActionArea onClick={() => console.log('test')}> */}
        
        <CardHeader
            classes={{
                title: classes.title,
                root: background[0],
                subheader: classes.title
            }}
            action={
              <MenuContext.Provider value={MenuContextValue}>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <ProjectMenu />
              </MenuContext.Provider>
            }
            title={project.title}
            subheader={<div>
              <Typography variant='body1' >
                {`By ${project.client.name}`}
              </Typography>
              <Typography variant='body2'>
                {project.start_date}
              </Typography>
            </div>}
        />
        
      {/* </CardActionArea> */}
      
      <CardContent className={classes.cardContent}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography gutterBottom variant="h5" component="h2">
                Description:
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                {project.description}
            </Typography>
          </Grid>
          <Grid item md={5} xs={5}>
            <Typography gutterBottom variant="h5" component="h2">
                Team Members
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {project.totalTeamMembers}
            </Typography>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Grid item md={5} xs={5}>
            <Typography gutterBottom variant="h5" component="h2">
                Tasks
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {project.tasks_count}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1} className={classes.progress}>
          <Grid item md={12} xs={12}>
            <Typography variant="h5">
              Progress : {`${Math.round(project.progress)}%`}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <BorderLinearProgress variant="determinate" value={Math.round(project.progress)}/>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleEditProject(project,index)}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={() => handleViewProject(project,index)}>
          View
        </Button>
        <Button size="small" color="primary" onClick={() => handleViewComment(project,index)}>
          Comments
        </Button>
      </CardActions>
    </Card>
  );
}

export default Project;