import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Snackbar, SnackbarContent, Slide, IconButton } from '@material-ui/core';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import { useStylesFlashMessage } from "../../../static/css/cssMain";
import { connect } from 'react-redux'
import useNotification from '../../../hooks/useNotification'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const [setNotification] = useNotification();
function MySnackbarContentWrapper(props) {
  const classes = useStylesFlashMessage();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
      <SnackbarContent
          className={clsx(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
              <span id="client-snackbar" className={classes.message}>
                  <Icon className={clsx(classes.icon, classes.iconVariant)} />
                  {message}
              </span>
          }
          action={[
              <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  onClick={onClose}
              >
                  <CloseIcon className={classes.icon} />
              </IconButton>
          ]}
          {...other}
      />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};
const Footer = props => {
  const { className,dispatch, ...rest } = props;
  console.log(props)
  const classes = useStyles();
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = () => {
    setNotification({ open: false, type: '', message: ''})
  }
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://devias.io/"
          target="_blank"
        >
          Devias IO
        </Link>
        . 2019
      </Typography>
      <Typography variant="caption">
        Created with love for the environment. By designers and developers who
        love to work together in offices!
      </Typography> */}
      {/* <Snackbar
        open={props.notification.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        variant = {props.notification.type}
        message={props.notification.message}
      /> */}
       <Snackbar
            // anchorOrigin={{
            //     vertical: "top",
            //     horizontal: "right"
            // }}
            open={props.notification.open}
            autoHideDuration={2500}
            onClose={handleClose}
            
        >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant={
                    props.notification &&
                    props.notification.type
                        ? props.notification.type
                        : "success"
                }
                message={props.notification.message}
                TransitionComponent={SlideTransition}
            />
        </Snackbar>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = store => {
  return {
      notification: store.notifications.options
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//       setNotification: notification => dispatch({ type: 'SET_NOTIFICATION', payload: notification})
//   }
// }

export default connect(mapStateToProps)(Footer);
