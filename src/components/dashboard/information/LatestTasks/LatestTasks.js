import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { options } from './chart';
import { apiCall } from '../../../../utils/apiCall'

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestTasks = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const config = {
    barThickness: 10,
    maxBarThickness: 8,
    barPercentage: 0.5,
    categoryPercentage: 0.5,
  }
  const [data,setData] = useState({
    datasets: [
    {
      ...config,
      label: 'Pending',
      backgroundColor: "#00d0bd",
      data: []
    },
    {
      ...config,
      label: 'In Progress',
      backgroundColor: "#5D92F4",
      data: []
    },
    {
      ...config,
      label: 'Completed',
      backgroundColor: "#00D014",
      data: []
    },
    {
      ...config,
      label: 'Cancelled',
      backgroundColor: "#ff3739",
      data: []
    },

  ]});

  useEffect(() => {

    const options = {
      method: 'get',
      url: '/projects/getProjectWithTaskForDashboard'
    }

    apiCall(options).then( response => {
      if(response.data.projects){
        if(response.data.projects.labels){
          let dataSets = data.datasets
          let newSet = dataSets.map((chunk,index) => {
            return {...chunk,data:response.data.projects.datasets[index]}
          })
          setData({...data,labels: response.data.projects.labels,datasets: [...newSet]})
        }
        
      }
    }).catch( error => {

    })

  },[])
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            size="small"
            variant="text"
          >
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Latest Projects"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestTasks.propTypes = {
  className: PropTypes.string
};

export default LatestTasks;
