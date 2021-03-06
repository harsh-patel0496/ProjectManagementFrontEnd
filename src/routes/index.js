import React,{ lazy, Suspense } from 'react'
import { Switch,Redirect } from 'react-router-dom'
import GuestRoute from './guestRoute'
import PrivateRoute from './privateRoute'
//import AuthLayout from '../components/auth/layout/AuthLayout'
import Layout from '../components/auth/layout/MainLayout/Main'
import Dashboard from '../components/dashboard'
import Profile from '../components/settings/profile'
import Projects from '../components/projects'
import TaskList from '../components/tasklist'
import ViewProject from '../components/projects/ViewProject'

const Messanger = lazy(() => (
    import('../components/messanger')
))

const Login = lazy(() => (
    import('../components/auth/login')
))

const Signup = lazy(() => {
    return import('../components/auth/singup')
})
const ResetPassword = lazy(() => {
    return import('../components/auth/resetpassword')
})
const ChangePassword = lazy(() => {
    return import('../components/auth/changePassword')
})
//import { Signup } from '../components/auth'

const LoadingMessage = () => (
    "I'm loading..."
)

function Route() {
    return (
        <Suspense fallback={<LoadingMessage />}>
            <Switch>
                <Redirect
                    exact
                    from="/"
                    to="/dashboard"
                />
                <PrivateRoute path='/dashboard' component={Dashboard} layout={Layout} exact={true}/>
                <GuestRoute path='/login' component={Login} exact={true} />
                <GuestRoute path='/signup' component={Signup} exact={true} />
                <GuestRoute path='/resetPassword' component={ResetPassword} exact={true} />
                <GuestRoute path='/changePassword/:email' component={ChangePassword} exact={true} />
                <PrivateRoute path='/settings/profile' component={Profile} layout={Layout} exact={true} />
                <PrivateRoute path='/projects' component={Projects} layout={Layout} exact={true} />
                <PrivateRoute path='/projects/view/:project' component={ViewProject} layout={Layout} exact={true} />
                <PrivateRoute path='/tasks/:project' component={TaskList} layout={Layout} exact={true} />
                <PrivateRoute path='/messanger' component={Messanger} layout={Layout} exact={true} />
            </Switch>
        </Suspense>
    )
}

export default Route
