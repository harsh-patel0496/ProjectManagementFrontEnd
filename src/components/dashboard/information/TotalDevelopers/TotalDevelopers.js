import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Avatar } from '@material-ui/core';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { DashboardLayoutContext } from '../Layout'
import { DashboardContext } from '../../index'
import withLayout from '../HOC/withLayout'
import { useTotalProfitStyle } from './useTotalProfitStyle'

const TotalDevelopers = props => {

  const {
    classes
  } = useContext(DashboardLayoutContext)
  
  const {
    primaryInfo
  } = useContext(DashboardContext)

  const totalProfitClasses = useTotalProfitStyle()
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
              TOTAL DEVELOPERS
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {primaryInfo.developersCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={totalProfitClasses.avatar}>
              <PeopleOutlineIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </React.Fragment>
    
  );
};

TotalDevelopers.propTypes = {
  className: PropTypes.string
};

export default withLayout(TotalDevelopers);
