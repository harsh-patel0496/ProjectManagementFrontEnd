import React,{ 
    useState,
    //useEffect 
} from 'react'
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import useNotification from '../../../hooks/useNotification';
import useAuthentication from '../../../hooks/useAuthentication';
//import useCompanyTypes from '../../../hooks/useCompanyTypes'

function EditProfile(props) {

    const [setNotification] = useNotification();
    const [userFromRedux,setLogin,SetLogout,setUserToRedux] = useAuthentication();
    const [user,setUser] = useState(userFromRedux);
    // const [companyTypes,setCompanyTypes] = useState([]);
    // const [companyTypesFromRudux,setCompanyTypesToRedux] = useCompanyTypes();
    // useEffect(() => {

    //     if(companyTypesFromRudux && companyTypesFromRudux.length > 0){
    //         setCompanyTypes(companyTypesFromRudux)
    //     } else {
    //         const options = {
    //             method: 'get',
    //             url: '/companyTypes'
    //         }
    //         apiCall(options).then( response => {
    //             const companyTypes = response.data.companyTypes
    //             setCompanyTypesToRedux(companyTypes)
    //             setCompanyTypes(companyTypes)
    //         }).catch( error => {
    //             console.log(error)
    //         })
    //     }

    // },[]);
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
            .required(requiredAuthMsg)
        
    
    });

    const handleEditProfile = (values) => {
        const options = {
            method: 'put',
            url:`/users/${user.id}`,
            data: { data: values}
        }
        apiCall(options).then( response => {
            const notificationOptions = {
                open: true,
                message: 'User has been Updated!',
                type: 'success'
            }
            setUser(response.data.user)
            setUserToRedux(response.data.user)
            //setLogin(response.data.user);
            setNotification(notificationOptions);
        }).catch( error => {
            console.log(error)
        });
    }
    return (
        <div>
            <Formik
                children = {(props) => (<Form {...props}/>)}
                initialValues={
                    { 
                        ...user
                    }
                }
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleEditProfile(values)
                }}
            >
            </Formik>
            </div>
    )
}

export default EditProfile
