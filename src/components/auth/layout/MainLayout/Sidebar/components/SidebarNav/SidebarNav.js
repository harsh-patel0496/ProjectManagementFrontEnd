/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef,useContext,useState } from 'react';
import { NavLink as RouterLink,useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavigationContext } from '../../../Main'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import SettingMenu from './SettingMenu'

const useStyles = makeStyles(theme => ({
  root: {
    //overflowY: 'scroll'
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    marginTop: '5px',
    color: colors.blueGrey[800],
    //color: 'white',
    padding: '10px 8px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.primary.main,
    //color: 'white',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    backgroundColor:'rgba(99, 128, 156,0.5)',
    color: 'white',
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: 'white'  
    },
    '&:hover': {
      backgroundColor:'rgba(99, 128, 156,1)',
    },
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  const classes = useStyles();
  const {
    variant,
    openSidebar,
    handleSidebarClose
  } = useContext(NavigationContext)
  const history = useHistory();
  const pathName = history.location.pathname
  const [openSettings,setOpenSettings] = useState(pathName === '/settings/profile' ? true : false)

  const toggleOpenSetting = () => {
    setOpenSettings(!openSettings)
  }

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
// };
  
  return (
    <Scrollbars
      autoHide
      autoHideDuration={200}
      thumbSize={50}
    >
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map((page,index) => (
        <React.Fragment key={index}>
          <ListItem
            className={classes.item}
            disableGutters
            key={index}
          >
            {openSidebar && <Button
              aria-controls="simple-menu"
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.collapse ? false : page.href}
              onClick={(event) => {
                if(variant == 'temporary'){
                  handleSidebarClose()
                }
                {openSidebar && (page.collapse && toggleOpenSetting())}
              }}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
              {page.collapse && (openSettings ? <ExpandLess style={{position: 'absolute',right:5}}/> : <ExpandMore  style={{position: 'absolute',right:5}}/>)}
            </Button>}
            
            {!openSidebar && <SettingMenu 
                classes={classes} 
                page={page} 
                CustomRouterLink={CustomRouterLink}
              />
            }
          </ListItem>
          {openSidebar && (page.collapse && 
          <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {page.collapseItems.map((collapseItem,index) => {
                return (<ListItem key={index}>
                  <Button
                  
                    activeClassName={classes.active}
                    className={classes.button}
                    component={CustomRouterLink}
                    to={collapseItem.href}
                    onClick={() => {
                      if(variant == 'temporary'){
                        handleSidebarClose()
                      }
                      // {page.collapse && toggleOpenSetting()}
                      
                    }}
                  >
                    <div className={classes.icon}>{collapseItem.icon}</div>
                    {collapseItem.title}
                    
                  </Button>
              </ListItem>)
                  
              })}
              
            </List>
          </Collapse>)}
        </React.Fragment>
        
      ))}
    </List>
    </Scrollbars >
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
