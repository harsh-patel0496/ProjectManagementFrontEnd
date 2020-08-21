import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EventIcon from '@material-ui/icons/Event';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    //backgroundColor: 'black',
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    },
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  root: {
    backgroundImage: `url(/SidebarBackgound.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    //backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {

  const { open, variant, onClose, className, ...rest } = props;
  const classes = useStyles();
  console.log(open)
  // const pages = [
  //   {
  //     title: 'Dashboard',
  //     href: '/dashboard',
  //     icon: <DashboardIcon />
  //   },
  //   {
  //     title: 'Customers',
  //     href: '/customer',
  //     icon: <PeopleIcon />
  //   },
  //   {
  //     title: 'Events',
  //     href: '/events',
  //     icon: <EventIcon />
  //   },
  //   {
  //     title: 'Authentication',
  //     href: '/authenticate/laraApp',
  //     icon: <LockOpenIcon />
  //   },
  //   {
  //     title: 'Roles',
  //     href: '/laraApp/roles',
  //     icon: <TextFieldsIcon />
  //   },
  //   {
  //     title: 'Messanger',
  //     href: '/message',
  //     icon: <ChatIcon />
  //   },
  //   {
  //     title: 'Settings',
  //     href: '/settings',
  //     collapse: true, 
  //     icon: <AccountBoxIcon />
  //   },
  //   {
  //     title: 'Projects',
  //     href: '/projects',
  //     icon: <AssignmentTurnedInIcon />
  //   }
  // ];

  return (
      <Drawer
        //anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <div
          {...rest}
          className={clsx(classes.root, className)}
        >
          <Profile />
          <Divider className={classes.divider} />
          <SidebarNav
            className={classes.nav}
            pages={pages}
            onClose={onClose}
          />
          {/* <UpgradePlan /> */}
        </div>
      </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
