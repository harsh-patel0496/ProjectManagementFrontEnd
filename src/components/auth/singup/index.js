import React,{useState} from 'react'
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
    const [isLoading,setIsLoading] = useState(false)
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        name: Yup.string()
            .required(requiredAuthMsg),
        company_type: Yup.object()
            .required(requiredAuthMsg),
        address: Yup.string()
            .required(requiredAuthMsg),
        contact_no: Yup.string()
            .matches(/^(?=.*\d)(?=.*[-+]?)(?!.*[a-z])(?!.*[A-Z])(?!.*\s).{10,}$/,'Enter valid contact no.')
            .required(requiredAuthMsg),
        no_of_users: Yup.number()
            .positive('Enter valid number.')
            .required(requiredAuthMsg),
        email: Yup.string()
            .email('Enter valid email.')
            .required(requiredAuthMsg),
        password: Yup.string()
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/,
                'Password must contain at least one upercase,one lower case character and one digit. And length should be 8 or larger.'
            )
            .required(requiredAuthMsg),
        
    
    });

    const handleSignup = (values) => {
        setIsLoading(true)
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
            setIsLoading(false)
            props.history.push('/');
        }).catch( error => {
            const notificationOptions = {
                open: true,
                message: 'Oops! Something went wrong.',
                type: 'error'
            }
            setNotification(notificationOptions);
            setIsLoading(false)
            console.log(error)
        });
    }

    return (
        <AuthLayout {...props} title="Register" subtitle={true} >
            <Formik
                children = {(props) => (<Form {...props} isLoading={isLoading} user={user}/>)}
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
