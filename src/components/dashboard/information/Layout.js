import React from 'react';
import clsx from 'clsx';
import { Card, CardContent } from '@material-ui/core';
import { useDashboardLayouteStyles } from '../../../assets/css/dashboardLayout'
export const DashboardLayoutContext = React.createContext()

const Layout = props => {
  const { className,children, ...rest } = props;

  const classes = useDashboardLayouteStyles();
  const contextValue = {
      className,
      classes
  }

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
