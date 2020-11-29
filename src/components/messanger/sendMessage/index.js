import React,{ useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form'
import { Formik } from 'formik'
import * as Yup from "yup";
import { apiCall } from '../../../utils/apiCall';
import { ChatContext } from '../index'

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        bottom: "20px",
        width: "67.5%"
    },
}));
function SendMessage(props) {

    const classes = useStyles();
    const initialValues = {
        message: ''
    }

    const {
        selectedChat,
        //messages,
        //setMessages,
        //setMessageToRedux
    } = useContext(ChatContext)

    const inputRef = React.createRef();

    const requiredAuthMsg ='This field is required'
    const validationSchema = Yup.object().shape({
        message: Yup.string()
            .required(requiredAuthMsg)
    });

    const handleSendMessage = (values) => {
        let is_team = selectedChat && selectedChat.friendable_type === "App\\Team" ? true : false;
        let data = {...values,receiver_id: selectedChat.friendable_id,is_team}

        const options = {
            method: 'post',
            url: '/messages',
            data: {
                data
            }
        }

        apiCall(options).then( response => {
            inputRef.current.value = '';
            //setMessages([...messages,response.data.newMessage])
            //setMessageToRedux(messages)
            console.log('Message Added',response)
        }).catch( error => {
            console.log('Message Add Error',error)
        })
    }

    return (
        <div className={classes.root}>
             <Formik
                children = {(props) => (<Form {...props} ref = {inputRef}/>)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit = { values => {
                    handleSendMessage(values)
                }}
            >
            </Formik>
        </div>
    )
}

export default SendMessage
