import { makeStyles } from '@material-ui/styles';

export const useStyleTaskComponent = makeStyles(theme => ({
    root: {
      maxWidth: 250,
      margin: theme.spacing(3),
      //borderTop: '3px solid #00D0BD',
        
    },
    border1:{
      borderTop: '3px solid #00D0BD',
    },
    border2:{
      borderTop: '3px solid #2E77FF',
    },
    border3:{
      borderTop: '3px solid #00BD13',
    },
    rootDiv: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(10),
        //height: '100% !important',
        overflow: 'hidden'
    },
    rootCard: {
        maxWidth: 300,
        //margin: theme.spacing(3)
      },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    classPedding: {
        marginBottom: theme.spacing(0),
        padding: '10px 10px 5px 16px'
    }
  }));