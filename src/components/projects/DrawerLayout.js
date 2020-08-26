import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { Scrollbars } from 'react-custom-scrollbars';

function DrawerLayout(props) {
    return (
        <Drawer 
           {...props}
        >
            <Scrollbars
                autoHide
                autoHideDuration={200}
                thumbSize={50}
            >
                {props.children}            
            </Scrollbars>
        </Drawer>
    )
}

export default DrawerLayout
