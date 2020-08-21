import React from 'react'
import Form from './Form'
import AuthLayout from '../layout/AuthLayout'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import useNotification from '../../../hooks/useNotification';
import useAuthentication from '../../../hooks/useAuthentication';

function ResetPassword(props) {

    const [setNotification] = useNotification();
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        email: Yup.string()
            .required(requiredAuthMsg)
    });

    const handleResetPassword = (values) => {
        const options = {
            method: 'post',
            url:'/users/resetPassword',
            data: { data: values}
        }
        apiCall(options).then( response => {
            const notificationOptions = {
                open: true,
                message: 'Password reset has been sent successfully!',
                type: 'success',
                vertical: 'top',
                horizontal: 'center'
            }
            //setLogin(response.data.user);
            setNotification(notificationOptions);
            props.history.push('/login');
        }).catch( error => {
            console.log(error)
        });
    }
    
    return (
        <AuthLayout {...props} title="Reset Password" subtitle={false} width="40%">
            <Formik
                children = {(props) => (<Form {...props}/>)}
                initialValues={
                    {
                        email: ''
                    }
                }
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleResetPassword(values)
                }}
            />
        </AuthLayout>
    )
}

export default ResetPassword
