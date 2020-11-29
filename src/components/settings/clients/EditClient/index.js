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

function EditClient(props) {

    const {
        role,
        state,
        dispatch,
        // clients,
        // setClients,
        // setOpenClientDialog,
        // tableRef
    } = useContext(ClientContext)
    
    const initialValues = {
        ...state.client
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
    const handleEditCustomer = (values) => {
        //let tableData = values.tableData
        delete values.tableData;
        const data = {...values,role}
        const options = {
            method: 'put',
            url: `/clients/${state.client.id}`,
            data: {
                data
            }
        }

        apiCall(options).then( response => {
            if(response.data && response.data.client){
                //let newArr = [...clients]
                //newArr.splice(tableData.id,1,response.data.client)
                //setClients([...newArr])
                dispatch({ type:"TOGGLE_EDIT" })
                state.tableRef && state.tableRef.onQueryChange()
                const notificationOptions = {
                    open: true,
                    message: 'Client has been updated Successfully!',
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
                    handleEditCustomer(values)
                }}
            >
            </Formik>
        </div>
    )
}

export default EditClient
