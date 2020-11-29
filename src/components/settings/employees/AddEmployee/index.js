import React,{ 
    //useState,
    //useEffect,
    useContext } from 'react'
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../../utils/apiCall';
import { EmployeeContext } from '../List'
import useNotification from '../../../../hooks/useNotification';

function AddEmployee(props) {

    const {
        label,
        role,
        state,
        setOpenAddEmployeeDialog,
        // dispatch,
        // clients,
        // setClients,
        // tableRef
    } = useContext(EmployeeContext)
    
    const initialValues = {
        name: '',
        qualification: '',
        specilization: '',
        address: '',
        email: '',
        contact_no: ''
    }
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        name: Yup.string()
            .required(requiredAuthMsg),
        qualification: Yup.string()
            .required(requiredAuthMsg),
        specilization: Yup.string()
            .required(requiredAuthMsg),
        address: Yup.string()
            .required(requiredAuthMsg),
        contact_no: Yup.string()
            .required(requiredAuthMsg),
        email: Yup.string()
            .required(requiredAuthMsg)
    });
    const [setNotification] = useNotification();
    const handleAddEmployee = (values) => {
        let data = {...values,role}
        const options = {
            method: 'post',
            url: '/employees',
            data: {
                data
            }
        };

        apiCall(options).then( response => {
            if(response.data && response.data.employee){
                //setClients([response.data.client,...clients])
                setOpenAddEmployeeDialog(false)
                state.tableRef && state.tableRef.onQueryChange()
                const notificationOptions = {
                    open: true,
                    message: 'Employee has been added Successfully!',
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
                children = {(props) => (<Form {...props} label={label}/>)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleAddEmployee(values)
                }}
            >
            </Formik>
        </div>
    )
}

export default AddEmployee
