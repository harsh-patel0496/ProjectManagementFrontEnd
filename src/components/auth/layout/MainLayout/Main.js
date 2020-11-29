import React, { useState,useEffect } from 'react';


import PropTypes from 'prop-types';
//import clsx from 'clsx';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Sidebar from './Sidebar/index';
import Topbar from './Topbar/index'
//import Footer from './Footer/index'
import { Scrollbars } from 'react-custom-scrollbars';
//import CssBaseline from '@material-ui/core/CssBaseline';
import {useMainLayoutStyles} from '../../../../assets/css/mainLayout'
import Notification from '../../../../utils/styledComponent/Notification'
import ComponentLoader from '../../../../utils/styledComponent/ComponentLoader'
import useComponentLoader from '../../../../hooks/useComponentLoader'

export const NavigationContext = React.createContext();
const Main = props => {
  const { children } = props;

  const classes = useMainLayoutStyles();
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
  //const shouldOpenSidebar = isDesktop ? true : openSidebar;

  
  const contextValue = {
    openSidebar,
    handleSidebarOpen,
    handleSidebarClose,
    handleToggleDrawer,
    variant: isDesktop ? 'permanent' : 'temporary'
  }

  const [setLoader] = useComponentLoader()

  useEffect(() => {
    setLoader({open: true})
  },[setLoader])
  
  return (
    
    <div
      className={classes.root}
    >
      {/* <CssBaseline /> */}
      <NavigationContext.Provider value={contextValue}>
        {/* <Topbar onSidebarOpen={handleSidebarOpen} openSidebar={openSidebar} handleToggleDrawer={handleToggleDrawer} {...children.props} /> */}
        <Topbar {...children.props} />
        
        {/* <Sidebar
          onClose={handleSidebarClose}
          open={openSidebar}
          variant={isDesktop ? 'permanent' : 'temporary'}
        /> */}
        <Sidebar />
      </NavigationContext.Provider>
      <Scrollbars
        autoHide
        autoHideDuration={200}
        thumbSize={50}
      >
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <ComponentLoader />
            <Notification />
            {children}
            {/* <Footer /> */}
        </main>
      </Scrollbars>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
