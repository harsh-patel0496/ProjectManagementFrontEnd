import React from 'react'
import Task from './Task'

function TaskList(props) {
    return (
        <div>
            <Task {...props}/>
        </div>
    )
}

export default TaskList
