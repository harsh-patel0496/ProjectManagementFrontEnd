import React from 'react'
import { Draggable } from "react-beautiful-dnd";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import RootRef from "@material-ui/core/RootRef";
import Typography from '@material-ui/core/Typography';

function Ticket(props) {
    const {
        index,
        task,
        classes
    } = props

    const getPreetyDate = (date) => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let taskDate = new Date(date);
        const preetyDate = `${months[taskDate.getMonth()]} ${taskDate.getDate()}, ${taskDate.getFullYear()}`;
        return preetyDate;
    }
    return (
        <Draggable
            key={task.id} draggableId={`draggable${task.id}`} index={index}
        >
            {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                    <Card
                        className={`${classes.root} ${classes[`border${task.type}`]}`}
                        variant="outlined"
                        id= {task.id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <CardHeader 
                            classes={{
                                title: `${classes.fontSize} ${classes[`border${task.type}`]}`,
                                subheader: classes.title
                            }}
                            title= {task.name}
                            subheader={getPreetyDate(task.created_at)}
                            className = {classes.classPedding}
                        />
                        <CardContent 
                            className = {classes.classPedding}
                        >
                            <Typography gutterBottom variant="h5" component="h2">
                                Description:
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {task.description}
                            </Typography>
                        </CardContent >
                        <CardActions>
                            <Button size="small" color="primary" >
                                Edit
                            </Button>
                            <Button size="small" color="primary" >
                                View
                            </Button>
                            <Button size="small" color="primary">
                                Comments
                            </Button>
                        </CardActions>
                    </Card >
                </RootRef>
            )}
        </Draggable>
    )
}

export default Ticket
