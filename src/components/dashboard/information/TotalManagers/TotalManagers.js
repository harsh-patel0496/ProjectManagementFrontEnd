import React,{useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { DashboardLayoutContext } from '../Layout'
import { DashboardContext } from '../../index'
import withLayout from '../HOC/withLayout'
import { useTotalUserStyle } from './useTotalUserStyle'

const TotalManagers = props => {
  const { ...rest } = props;
  
  const {
    classes
  } = useContext(DashboardLayoutContext)
  
  const {
    primaryInfo
  } = useContext(DashboardContext)

  const totalUserClasses = useTotalUserStyle()
  
  console.log(primaryInfo)
  return (
    <React.Fragment>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL MANAGERS
            </Typography>
            <Typography variant="h3">{primaryInfo.managersCount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={totalUserClasses.avatar}>
              <AssignmentIndIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={totalUserClasses.difference}>
          <ArrowUpwardIcon className={totalUserClasses.differenceIcon} />
          <Typography
            className={totalUserClasses.differenceValue}
            variant="body2"
          >
            16%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Since last month
          </Typography>
        </div>
    </React.Fragment>
  );
};

TotalManagers.propTypes = {
  className: PropTypes.string
};

export default withLayout(TotalManagers);
