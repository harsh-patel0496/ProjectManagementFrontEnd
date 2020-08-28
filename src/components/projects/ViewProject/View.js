import React,{useState} from 'react'
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import  { Card,CardContent,CardHeader, Typography,Grid } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useProject from '../../../hooks/useProject'
import Description from './Description'
import FilesUploaded from './FilesUploaded'
import Progress from './Progress'
import PrimaryDetails from './PrimaryDetails'
import Comments from './Comments'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(10),
        //height: '100% !important',
        overflow: 'hidden'
    },
    drawer: {
        height: '100% !important',
        overflow: 'hidden',
        width: "50%"
    },
    
}));
function View(props) {
    const classes = useStyles();
    const [projectFromRudux] = useProject()
    const [project,setProject] = useState(projectFromRudux)

    console.log(project)
    return (
        <div className={classes.root}>
            <Card>
                <CardHeader
                   title = {
                            <Typography variant="h3">
                                Project Detail
                            </Typography>
                    }
                    subheader= {<Typography variant="h5" >{project.title}</Typography>}    
                    avatar = {
                        <IconButton aria-label="back" onClick={() => {
                            props.history.push('/projects')
                        }}>
                            <ChevronLeftIcon />
                        </IconButton>
                    }
                >
                </CardHeader>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={8} sm={12}>
                            <Description description={project.description}/>
                            <FilesUploaded />
                        </Grid>
                        <Grid item md={4} sm={12}>
                            <PrimaryDetails project={project}/>
                            <Progress progress={project.progress}/>
                            <Comments project={project.id}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default View
