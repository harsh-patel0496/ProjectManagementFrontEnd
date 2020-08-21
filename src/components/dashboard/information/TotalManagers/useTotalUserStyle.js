import { makeStyles } from '@material-ui/styles';

export const useTotalUserStyle = makeStyles(theme => ({
    
    avatar: {
      backgroundColor: theme.palette.success.light,
      height: 56,
      width: 56
    },
    difference: {
      marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    differenceIcon: {
      color: theme.palette.success.dark
    },
    differenceValue: {
      color: theme.palette.success.dark,
      marginRight: theme.spacing(1)
    }
  }));