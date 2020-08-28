import React,{useContext} from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {MenuContext} from './Project'

function ProjectMenu(props) {

    const {
        anchorEl,
        setAnchorEl,
        index,
        project,
        handleAddComment,
        handleAddTask
    } = useContext(MenuContext)

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleAddComment(project,index)
                    handleClose()
                }}>Add Comment</MenuItem>
                <MenuItem onClick={() => {
                    handleAddTask(project,index)
                    handleClose()
                }}>Tasks</MenuItem>
                <MenuItem onClick={handleClose}>Attach File</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default ProjectMenu
