import { makeStyles } from '@material-ui/styles';

export const useMainLayoutStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      paddingTop: 56,
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64
      }
    },
    // shiftContent: {
    //   paddingLeft: 240
    // },
    content: {
      //zIndex: 1000,
      //overflow: 'scroll',
      height: '100% !important',
      width: '100%'
    }
}));