import React from 'react'

function SettingCollapseMenu() {
    return (
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {page.collapseItems.map(collapseItem => {
                return (<ListItem >
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
        </Collapse>
    )
}

export default SettingCollapseMenu
