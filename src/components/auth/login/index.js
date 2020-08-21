import React from 'react'
import Form from './form'
import AuthLayout from '../layout/AuthLayout'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import useNotification from '../../../hooks/useNotification';
import useAuthentication from '../../../hooks/useAuthentication';

function Login(props) {

    const [setNotification] = useNotification();
    const [user,setLogin] = useAuthentication();
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        email: Yup.string()
            .required(requiredAuthMsg),
        password: Yup.string()
            .required(requiredAuthMsg),
    });

    const handleLogin = (values) => {
        const options = {
            method: 'post',
            url:'/users/login',
            data: { data: values}
        }
        apiCall(options).then( response => {
            const notificationOptions = {
                open: true,
                message: 'You are loggedIn. Enjoy!',
                type: 'success',
                vertical: 'top',
                horizontal: 'center'
            }
            setLogin(response.data.user);
            setNotification(notificationOptions);
            props.history.push('/');
        }).catch( error => {
            console.log(error)
        });
    }
    
    return (
        <AuthLayout {...props} title="Login" subtitle={true} width="50%">
            <Formik
                children = {(props) => (<Form {...props}/>)}
                initialValues={
                    {
                        email: '',
                        password: ''
                    }
                }
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleLogin(values)
                }}
            />
        </AuthLayout>
    )
}

export default Login
