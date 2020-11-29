import React,{ 
    //useState,
    //useEffect,
    useContext 
} from 'react'
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../../utils/apiCall';
import { ClientContext } from '../List'
import useNotification from '../../../../hooks/useNotification';

function AddClient(props) {

    const {
        role,
        state,
        // dispatch,
        // clients,
        // setClients,
        setOpenClientDialog,
        //tableRef
    } = useContext(ClientContext)
    
    const initialValues = {
        name: '',
        contact_person: '',
        address: '',
        email: '',
        contact_no: ''
    }
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        name: Yup.string()
            .required(requiredAuthMsg),
        contact_person: Yup.string()
            .required(requiredAuthMsg),
        address: Yup.string()
            .required(requiredAuthMsg),
        contact_no: Yup.string()
            .required(requiredAuthMsg),
        email: Yup.string()
            .required(requiredAuthMsg)
    });
    const [setNotification] = useNotification();
    const handleAddCustomer = (values) => {
        const data = {...values,role}
        const options = {
            method: 'post',
            url: '/clients',
            data: {
                data
            }
        };

        apiCall(options).then( response => {
            if(response.data && response.data.client){
                //setClients([response.data.client,...clients])
                setOpenClientDialog(false)
                state.tableRef && state.tableRef.onQueryChange()
                const notificationOptions = {
                    open: true,
                    message: 'Client has been added Successfully!',
                    type: 'success'
                }
                setNotification(notificationOptions);
            }
        }).catch( error => {
            console.log(error)
        })
    }

    return (
        <div>
             <Formik
                children = {(props) => (<Form {...props}/>)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleAddCustomer(values)
                }}
            >
            </Formik>
        </div>
    )
}

export default AddClient
