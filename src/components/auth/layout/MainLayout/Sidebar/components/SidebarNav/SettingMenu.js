import React,{useContext} from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import { NavigationContext } from '../../../Main'
function SettingMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const {
        variant,
        openSidebar,
        handleSidebarClose
      } = useContext(NavigationContext)
    const {
        page,
        classes,
        CustomRouterLink
    } = props;

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Button
              aria-controls="simple-menu"
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.collapse ? null : page.href}
              onClick={(event) => {
                if(variant === 'temporary'){
                  handleSidebarClose()
                }
                !openSidebar && (page.collapse && handleMenuClick(event))
              }}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
              
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
            {anchorEl && page.collapseItems.map(collapseItem => {
            return (
                <MenuItem onClick={handleMenuClose}>{collapseItem.title}</MenuItem>
            )
            })}
        </Menu>
      </React.Fragment>
    )
}

export default SettingMenu
