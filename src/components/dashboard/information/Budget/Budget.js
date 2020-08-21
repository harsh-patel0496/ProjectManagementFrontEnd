import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { DashboardLayoutContext } from '../Layout'
import { DashboardContext } from '../../index'
import withLayout from '../HOC/withLayout'
import { useBadgetStyle } from './useBadgetStyle'

const Budget = props => {
  const { ...rest } = props;
  
  const {
    classes
  } = useContext(DashboardLayoutContext)

  const {
    primaryInfo
  } = useContext(DashboardContext)

  const budgetClasses = useBadgetStyle()

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
            TOTAL CUSTOMERS
          </Typography>
          <Typography variant="h3">{primaryInfo.clientsCount}</Typography>
        </Grid>
        <Grid item>
          <Avatar className={budgetClasses.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
        </Grid>
      </Grid>
      <div className={budgetClasses.difference}>
        <ArrowDownwardIcon className={budgetClasses.differenceIcon} />
        <Typography
          className={budgetClasses.differenceValue}
          variant="body2"
        >
          12%
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

Budget.propTypes = {
  className: PropTypes.string
};

export default withLayout(Budget);
