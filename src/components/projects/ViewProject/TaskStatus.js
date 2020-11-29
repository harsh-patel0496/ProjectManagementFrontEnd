import React from 'react'
import Chip from '@material-ui/core/Chip';

function TaskStatus(props) {

    const { task } = props
    let render;
    switch(task.type){
        case 1:
            render = <Chip 
                style={{backgroundColor:"#42A5F5", color: "white"}}
                label = "Pending"
                size="small"
            />
            return render
        case 2:
            render = <Chip
                style={{backgroundColor:"#66BB6A", color: "white"}}
                label = "In Progress"
                size="small"
            />
            return render
        case 3:
            render = <Chip 
                color="primary"
                label = "Completed"
                size="small"
            />
            return render
        default:
            render = <Chip 
                color="error"
                label = "No Update"
                size="small"
            />
            return render
    }
    
    return render
}

export default TaskStatus
