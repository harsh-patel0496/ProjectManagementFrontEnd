import React, {useState,useContext} from 'react';
//import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { TaskContext } from './Task'
function TaskMenu(props) {

    const [anchorEl,setAnchorEl] = useState(null)
    
    const {
        handleOpenAddTaskDialog
    } = useContext(TaskContext)
    
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    
    return (
        <React.Fragment>
            <IconButton
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                aria-label="settings" 
                onClick = {handleMenuOpen}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                
                <MenuItem onClick={handleOpenAddTaskDialog}>Select All</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose()
                    handleOpenAddTaskDialog(props.container)
                }}>Add New Task</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default React.memo(TaskMenu)
