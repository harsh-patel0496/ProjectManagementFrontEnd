import React from 'react'
import { Route,Redirect } from 'react-router-dom'

const GuestRoute = ({ component: Component,exact, ...rest }) => {
  const token = localStorage.getItem('user')
    return (
      <Route
        {...rest}
        render={({staticContext: staticcontext,...remains}) =>
          !Boolean(token) ? (
            <Component {...remains}/>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: remains.location }
              }}
            />
          )
        }
      />
    );
  }

  export default GuestRoute;