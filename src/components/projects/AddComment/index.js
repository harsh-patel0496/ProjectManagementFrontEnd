import React,{ useState,useContext } from 'react'
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import useNotification from '../../../hooks/useNotification';
import { ProjectContext } from '../List'

function AddComment(props) {

    const {
        selectedProject,
        setIsOpenAddCommentDialog
    } = useContext(ProjectContext)
    const initialValues = {
        comment: ''
    }
    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object({
        comment: Yup.string()
            .required(requiredAuthMsg)
    });
    const [setNotification] = useNotification();
    const [isLoading,setIsLoading] = useState(false)

    const handleAddComment = (values) => {
        setIsLoading(true)
        const dataToSave = {...values,project: selectedProject.project}
        const options = {
            method: "post",
            url: '/comments',
            data: {
                data: dataToSave
            }
        }

        apiCall(options).then( response => {
            setIsLoading(false)
            setIsOpenAddCommentDialog(false);
            const notificationOptions = {
                open: true,
                message: 'Comment has been added Successfully!',
                type: 'success'
            }
            setNotification(notificationOptions);
        }).catch( error => {
            setIsLoading(false)
            const notificationOptions = {
                open: true,
                message: 'Something went wrong!',
                type: 'error'
            }
            setNotification(notificationOptions);
        })
    }

    
    return (
        <div>
             <Formik
                children = {(props) => (<Form {...props} isLoading={isLoading}/>)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleAddComment(values)
                }}
            >
            </Formik>
        </div>
    )
}

export default AddComment
