import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Avatar } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { DashboardLayoutContext } from '../Layout'
import { DashboardContext } from '../../index'
import withLayout from '../HOC/withLayout'
import { useTotalProjectsStyle } from './useTotalProjectsStyle'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
const TotalProfit = props => {

  const {
    classes
  } = useContext(DashboardLayoutContext)
  
  const {
    primaryInfo
  } = useContext(DashboardContext)
  
  const totalProjectsClasses = useTotalProjectsStyle()
  return (
    <React.Fragment>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              TOTAL PROJECTS
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {primaryInfo.projectCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={totalProjectsClasses.avatar}>
              <AssignmentTurnedInIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={totalProjectsClasses.difference}>
        <ArrowDownwardIcon className={totalProjectsClasses.differenceIcon} />
        <Typography
          className={totalProjectsClasses.differenceValue}
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

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default withLayout(TotalProfit);
