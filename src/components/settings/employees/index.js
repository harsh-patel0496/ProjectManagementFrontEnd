import React from 'react'
import List from './List'

function Employees(props) {
    return (
        <div>
            <List {...props}/>
        </div>
    )
}

export default Employees
