import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Sidebar from './Sidebar/index';
import Topbar from './Topbar/index'
//import Footer from './Footer/index'
import { Scrollbars } from 'react-custom-scrollbars';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  // shiftContent: {
  //   paddingLeft: 240
  // },
  content: {
    //overflow: 'hidden',
    height: '100%',
    width: '100%'
  }
}));

const Main = props => {
  console.log(props)
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(true);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const handleToggleDrawer = () => {
    setOpenSidebar(!openSidebar)
  }
  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    
    <div
      className={classes.root}
    >
      <CssBaseline />
      <Topbar onSidebarOpen={handleSidebarOpen} openSidebar={openSidebar} handleToggleDrawer={handleToggleDrawer} {...children.props} />

        <Sidebar
          onClose={handleSidebarClose}
          open={openSidebar}
          variant={isDesktop ? 'permanent' : 'temporary'}
        />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {children}
          {/* <Footer /> */}
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
