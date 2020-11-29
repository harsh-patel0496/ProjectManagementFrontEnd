import React,{ useContext } from 'react'
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../../utils/apiCall';
import { TeamContext } from '../List'
import useNotification from '../../../../hooks/useNotification';

function AddTeam(props) {

    const {
        label,
        state,
        setOpenAddTeamDialog,
        // role,
        // dispatch,
        // clients,
        // setClients,
        // tableRef
    } = useContext(TeamContext)
    
    const initialValues = {
        name: '',
        description: '',
        managers: [],
        developers: [],
    }

    //const [isUniqueName,setIsUniqueName] = useState(false)
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(requiredAuthMsg),
        description: Yup.string()
            .required(requiredAuthMsg),
        managers: Yup.array()
            .required(requiredAuthMsg),
        developers: Yup.array()
            .required(requiredAuthMsg)
    });
    const [setNotification] = useNotification();
    const handleAddTeam = (values) => {
        let data = {...values}
        const options = {
            method: 'post',
            url: '/teams',
            data: {
                data
            }
        };

        apiCall(options).then( response => {
            if(response.data && response.data.team){
                //setClients([response.data.client,...clients])
                setOpenAddTeamDialog(false)
                state.tableRef && state.tableRef.onQueryChange()
                const notificationOptions = {
                    open: true,
                    message: 'Team has been added Successfully!',
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
                    handleAddTeam(values)
                }}
            >
            </Formik>
        </div>
    )
}

export default AddTeam
