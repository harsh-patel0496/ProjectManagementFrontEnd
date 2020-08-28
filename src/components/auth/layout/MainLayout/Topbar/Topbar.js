import React, { useState,useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { connect } from 'react-redux'
import {useToolbarStyles} from '../../../../../assets/css/toolbar'
import { NavigationContext } from '../Main'
import useAuthentication from '../../../../../hooks/useAuthentication'

const Topbar = props => {
  const { ...rest } = props;

  const classes = useToolbarStyles();

  const [notifications] = useState([]);
  const [user,setLogin,setLogout] = useAuthentication();
  const handleLogout = () => {
    localStorage.removeItem('user')
    setLogout()
    props.history.push('/login')
  }

  const {
    openSidebar,
    handleToggleDrawer
  } = useContext(NavigationContext)

  return (
    <AppBar
      {...rest}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openSidebar,
      })}
    >
      <Toolbar>
      <Hidden mdDown>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openSidebar,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        <Hidden mdDown className={classes.flexGrow}>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleLogout}
          >
            <InputIcon />
          </IconButton>
          {/* <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleLogout}
          >
            <InputIcon />
          </IconButton> */}
        </Hidden>
        <div className={classes.flexGrowRigth} />
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

// const mapDispatchToProps = dispatch => {
//   return {
//       setLogin: user => dispatch({ type: 'SET_LOGOUT', payload: user})
//   }
// }
export default Topbar;
