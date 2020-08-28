import React from 'react'
import { Draggable } from "react-beautiful-dnd";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import RootRef from "@material-ui/core/RootRef";
import Typography from '@material-ui/core/Typography';

function Ticket(props) {
    const {
        index,
        task,
        classes
    } = props

    const getPreetyDate = (date) => {
        console.log(date)
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let taskDate = new Date(date);
        console.log(taskDate)
        const preetyDate = `${months[taskDate.getMonth()]} ${taskDate.getDate()}, ${taskDate.getFullYear()}`;
        return preetyDate;
    }

    console.log('task',task)
    console.log('taskType',task.type)
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
                        title= {task.name}
                        subheader={getPreetyDate(task.created_at)}
                        className = {classes.classPedding}
                    />
                    <CardContent 
                        className = {classes.classPedding}
                    >
                        <Typography 
                            variant = "body1"
                        >
                            {task.description} 
                        </Typography>
                    </CardContent >
                </Card >
                </RootRef>
            )}
        </Draggable>
    )
}

export default Ticket
