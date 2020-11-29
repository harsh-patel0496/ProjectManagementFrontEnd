import { makeStyles } from '@material-ui/styles';

export const useStyleTaskComponent = makeStyles(theme => ({
    root: {
      maxWidth: 300,
      margin: theme.spacing(3),
      borderTop: '3px solid #e0e6eb',
    },
    fontSize: {
      fontSize:"1.1rem !important",
      fontWeight: 500
    },
    border1:{
      color:"#407EF2",
      //borderTop: '3px solid #42A5F5',
    },
    border2:{
      color: '#66BB6A'
      //borderTop: '3px solid #66BB6A',
    },
    border3:{
      color: '#63809C'
      //borderTop: '3px solid #63809C',
    },
    rootDiv: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(10),
        //height: '100% !important',
        overflow: 'hidden'
    },
    rootCard: {
        //maxWidth: 350,
        margin: theme.spacing(1)
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