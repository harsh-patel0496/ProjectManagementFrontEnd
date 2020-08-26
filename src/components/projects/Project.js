import React,{useState,useContext} from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { CardHeader } from "@material-ui/core";
import { ProjectContext } from './List'

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
      backgroundColor: "#eff2f5"
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
      color:"black"
  }
}));


function Project(props) {
  const {bg,project} = props
  const classes = useStyles();
  const background = [classes.primary,classes.secondary,classes.ternary,classes.tour]
  const {
    handleEditProject
  } = useContext(ProjectContext)
  

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => console.log('test')}>
        
        <CardHeader
            classes={{
                title: classes.title,
                root: background[0],
                subheader: classes.title
            }}
            title={project.title}
            subheader={<div>
              <Typography variant='body1'>
                {`By ${project.client.name}`}
              </Typography>
              <Typography variant='body2'>
                {project.start_date}
              </Typography>
            </div>}
        />
        
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        {/* <CardContent className={classes.cardHeader}>
          <Grid container alignItems="center">
            <Grid item md={12} xs={12}>
              <Typography gutterBottom variant="h5" component="h2" color="inherit">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" color="inherit">
                
              </Typography>
            </Grid>
          </Grid>
        </CardContent> */}
      
      <CardContent className={classes.cardContent}>
        <Grid container alignItems="center" >
          <Grid item md={4} xs={4}>
            <Typography gutterBottom variant="h5" component="h2">
                Developers
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {project.totalDevelopers}
            </Typography>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Grid item md={4} xs={4}>
            <Typography gutterBottom variant="h5" component="h2">
                Tasks
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                10
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleEditProject(project,props.index)}>
          Edit
        </Button>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default Project;