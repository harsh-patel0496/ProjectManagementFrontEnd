import { makeStyles } from '@material-ui/styles';

export const useTotalProjectsStyle = makeStyles(theme => ({
    
    avatar: {
      backgroundColor: theme.palette.info.light,
      height: 56,
      width: 56
    },
    difference: {
      marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    differenceIcon: {
      color: theme.palette.info.main
    },
    differenceValue: {
      color: theme.palette.info.dark,
      marginRight: theme.spacing(1)
    }
  }));