import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import useNotification from '../../hooks/useNotification';
import Snackbar from '@material-ui/core/Snackbar';

function Notification(props) {

    const [setNotification] = useNotification();
    const {
        notification
    } = props

    const handleClose = () => {
        const options = { 
            open: false, 
            type: '', 
            message: ''
        }
        setNotification(options)
    }

    return (
        <Snackbar 
            open={notification.open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: notification.vertical, horizontal: notification.horizontal }}
        >
            <MuiAlert 
                onClose={handleClose} 
                severity={notification.type !== '' ? notification.type : 'success'}
                elevation={6} 
            >
                {notification.message}
            </MuiAlert >
        </Snackbar>
    );
}


const mapStateToProps = (state) => {
    return {
        notification: state.notification && state.notification.options
    }
}

export default connect(mapStateToProps)(Notification)
