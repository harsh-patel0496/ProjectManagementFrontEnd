import React, { useContext }from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import { useSidebarStyles } from '../../../../../assets/css/sidebar'
import { NavigationContext } from '../Main'

const Sidebar = props => {

  const { className,...rest } = props;
  
  const {
    variant,
    openSidebar,
    handleSidebarClose
  } = useContext(NavigationContext)

  const classes = useSidebarStyles();
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Customers',
      href: '/customer',
      icon: <PeopleIcon />
    },
    {
      title: 'Events',
      href: '/events',
      icon: <EventIcon />
    },
    {
      title: 'Authentication',
      href: '/authenticate/laraApp',
      icon: <LockOpenIcon />
    },
    {
      title: 'Roles',
      href: '/laraApp/roles',
      icon: <TextFieldsIcon />
    },
    {
      title: 'Messanger',
      href: '/message',
      icon: <ChatIcon />
    },
    {
      title: 'Projects',
      href: '/projects',
      icon: <AssignmentTurnedInIcon />
    },
    {
      title: 'Settings',
      collapse: true,
      collapseItems: [{
          href: '/settings/profile',
          title: 'Profile',
          icon: <AccountBoxIcon />
        },
      ],
      href: '/settings',
      icon: <SettingsIcon />
    },
    
  ];

  return (
      <Drawer
        //anchor="left"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openSidebar,
          [classes.drawerClose]: !openSidebar,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openSidebar,
            [classes.drawerClose]: !openSidebar,
          }),
        }}
        onClose={handleSidebarClose}
        open={openSidebar}
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
          />
          {/* <UpgradePlan /> */}
        </div>
      </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  // onClose: PropTypes.func,
  // open: PropTypes.bool.isRequired,
  // variant: PropTypes.string.isRequired
};

export default Sidebar;
