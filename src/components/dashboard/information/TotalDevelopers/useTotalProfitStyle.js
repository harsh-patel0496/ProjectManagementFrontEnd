import { makeStyles } from '@material-ui/styles';

export const useTotalProfitStyle = makeStyles(theme => ({
    
    avatar: {
      backgroundColor: theme.palette.text.secondary,
      height: 56,
      width: 56
    },
    difference: {
      marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    differenceIcon: {
      color: theme.palette.secondary.main
    },
    differenceValue: {
      color: theme.palette.secondary.dark,
      marginRight: theme.spacing(1)
    }
  }));