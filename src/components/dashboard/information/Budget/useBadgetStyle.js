import { makeStyles } from '@material-ui/styles';

export const useBadgetStyle = makeStyles(theme => ({
    
    avatar: {
      backgroundColor: theme.palette.warning.main,
      height: 56,
      width: 56
    },
    difference: {
      marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    differenceIcon: {
      color: theme.palette.warning.dark
    },
    differenceValue: {
      color: theme.palette.warning.dark,
      marginRight: theme.spacing(1)
    }
  }));