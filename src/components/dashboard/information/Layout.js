import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { useDashboardLayouteStyles } from '../../../assets/css/dashboardLayout'
import Budget from './Budget'
export const DashboardLayoutContext = React.createContext()

const Layout = props => {
  const { className,children, ...rest } = props;

  const classes = useDashboardLayouteStyles();
  const contextValue = {
      className,
      classes
  }



  console.log('as')
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <DashboardLayoutContext.Provider value = {contextValue}>
            {children}
        </DashboardLayoutContext.Provider>
      </CardContent>
    </Card>
  );
};



export default Layout;
