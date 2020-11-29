import React,{useState,useEffect} from 'react'
import Form from './Form'
import AuthLayout from '../layout/AuthLayout'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import useNotification from '../../../hooks/useNotification';
//import useAuthentication from '../../../hooks/useAuthentication';

function ChangePassword(props) {

    const [setNotification] = useNotification();
    const initialValues = {   
        email: '',
        password: '',
        confirmPassword: ''
    };
    const [formValues,setFormValues] = useState(initialValues);
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(requiredAuthMsg),
        password: Yup.string()
            .required(requiredAuthMsg),
        confirmPassword: Yup.string()
            .required(" ")
            .oneOf(
                [Yup.ref("password")],
                "Both password must be same!"
            ),
    });

    useEffect(() => {
        const values = {
            email: props.match.params.email
        }
        const options = {
            method: 'post',
            url:'/users/getEmailAddress',
            data: { data: values}
        }
        apiCall(options).then( response => {
            setFormValues({...formValues,email:response.data.email});
        }).catch( error => {
            console.log(error)
        });
    },[props.match.params.email])
    const handleChangePassword = (values) => {
        const options = {
            method: 'post',
            url:'/users/changePassword',
            data: { data: values}
        }
        apiCall(options).then( response => {
            const notificationOptions = {
                open: true,
                message: 'Your password has been changes successfully',
                type: 'success'
            }
            setNotification(notificationOptions);
            props.history.push('/login');
        }).catch( error => {
            console.log(error)
        });
    }
    return (
        <AuthLayout {...props} title="Change Password" subtitle={true} >
            <Formik
                enableReinitialize
                children = {(props) => (<Form {...props}/>)}
                initialValues={
                    formValues
                }
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleChangePassword(values)
                }}
            />
        </AuthLayout>
    )
}

export default ChangePassword
