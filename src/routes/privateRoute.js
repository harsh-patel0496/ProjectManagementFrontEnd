import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import store from '../redux/index'
import { connect } from 'react-redux'

const PrivateRoute = ({ component : Component,layout:Layout,exact, ...rest }) => {
    //let token = localStorage.getItem('user') && false
    return (
      <Route
        {...rest}
        render={({staticContext: staticcontext,...remains}) =>
          rest.isLoggedIn ? (
            <Layout>
              <Component {...remains} />
            </Layout>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: remains.location }
              }}
            />
          )
        }
      />
    );
  }

  const mapStateToProps = (state) => {
    return {
      isLoggedIn : state.auth.isLoggedIn 
    }
  }
  export default connect(mapStateToProps)(PrivateRoute);

  //export default PrivateRoute;