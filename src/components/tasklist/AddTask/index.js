import React,{useContext} from 'react'

import { Formik } from 'formik'
import * as Yup from "yup"
//import { apiCall } from '../../../utils/apiCall'
//import { connect } from 'react-redux'
import Form from './Form'
import { TaskContext } from '../Task'

const requiredAuthMsg ='This field is required'
const validationSchema = Yup.object({
    name: Yup.string()
        .required(requiredAuthMsg),
    description: Yup.string()
        .required(requiredAuthMsg),
    team: Yup.object()
            .required(requiredAuthMsg),
    managers: Yup.array()
            .required(requiredAuthMsg),
    developers: Yup.array()
            .required(requiredAuthMsg),
});

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

function AddTask(props) {
    const {
        handleAddTask,
        // openAddTaskDialog,
        // handleCloseAddTaskDialog
    } = useContext(TaskContext)

    return (
        <div>
            <Formik 
                children = { props => (
                    <Form {...props}/>
                )}
                initialValues={{
                    name: '',
                    description: ''
                }}
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleAddTask(values)
                }}
            /> 
        </div>
    )
}

export default AddTask
