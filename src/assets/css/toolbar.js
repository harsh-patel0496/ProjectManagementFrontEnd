import { makeStyles } from '@material-ui/styles';

export const useToolbarStyles = makeStyles(theme => ({
    appBar: {
      position:"fixed",
      boxShadow: 'none',
      [theme.breakpoints.down('md')]: {
        width: `calc(100% - ${0}px)`,
      },
      width: `calc(100% - ${241}px)`,
      //left: `5.35%`,
      //marginLeft: '275px',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      left: 'auto',
      marginLeft: 241,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    flexGrow: {
      flexGrow: 1,
    },
    flexGrowRigth: {
      flexGrow: 0.06,
    },
    signOutButton: {
      marginLeft: theme.spacing(1)
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    menuButton: {
      marginRight: 36,
    },
  }));