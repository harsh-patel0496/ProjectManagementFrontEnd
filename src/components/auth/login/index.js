import React, {useState} from 'react'
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
    const [isLoading,setIsLoading] = useState(false)

    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Enter valid email.')
            .required(requiredAuthMsg),
        password: Yup.string()
            .required(requiredAuthMsg),
    });

    const handleLogin = (values) => {
        setIsLoading(true)
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
            setIsLoading(false)
            props.history.push('/');
        }).catch( error => {
            const notificationOptions = {
                open: true,
                message: 'Invalid password or email.',
                type: 'error',
                vertical: 'top',
                horizontal: 'center'
            }
            setNotification(notificationOptions);
            setIsLoading(false)
        });
    }
    
    return (
        <AuthLayout {...props} title="Login" subtitle={true} width="50%">
            <Formik
                children = {(props) => (<Form {...props} isLoading={isLoading} user={user}/>)}
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
