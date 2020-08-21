import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import Form from './form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import useNotification from '../../../hooks/useNotification';
import useAuthentication from '../../../hooks/useAuthentication';

function Signup(props) {

    const [setNotification] = useNotification();
    const [user,setLogin] = useAuthentication();
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        name: Yup.string()
            .required(requiredAuthMsg),
        company_type: Yup.object()
            .required(requiredAuthMsg),
        address: Yup.string()
            .required(requiredAuthMsg),
        contact_no: Yup.string()
            .required(requiredAuthMsg),
        no_of_users: Yup.string()
            .required(requiredAuthMsg),
        email: Yup.string()
            .required(requiredAuthMsg),
        password: Yup.string()
            .required(requiredAuthMsg),
        
    
    });

    const handleSignup = (values) => {
        const options = {
            method: 'post',
            url:'/users/signup',
            data: { data: values}
        }
        apiCall(options).then( response => {
            const notificationOptions = {
                open: true,
                message: 'User has been registered!',
                type: 'success'
            }
            console.log(response)
            setLogin(response.data.user);
            setNotification(notificationOptions);
            props.history.push('/');
        }).catch( error => {
            console.log(error)
        });
    }

    return (
        <AuthLayout {...props} title="Register" subtitle={true} >
            <Formik
                children = {(props) => (<Form {...props}/>)}
                initialValues={
                    { 
                        name : '',
                        company_type: '',
                        address: '',
                        contact_no: '',
                        no_of_users: '',
                        email: '',
                        password: ''
                    }
                }
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleSignup(values)
                }}
            >
            </Formik>
        </AuthLayout>
    )
}

export default Signup
