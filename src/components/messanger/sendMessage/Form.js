import React from 'react'
import {Grid } from '@material-ui/core';
//import SubmitButton from '../../../utils/styledComponent/SubmitButton'
import MessageTextField from '../../../utils/styledComponent/MessageTextField'
import MessageButton from '../../../utils/styledComponent/MessageButton'
import Icon from '@material-ui/core/Icon';

const Form = React.forwardRef((props,ref) => {
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
    } = props

    return (
        <form 
            onSubmit={handleSubmit}
        >
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    md={11}
                    xs={11}
                >
                    <MessageTextField
                        fullWidth
                        id="filled-name"
                        type="text"
                        placeholder="Type Message Here..."
                        name="message"
                        error={touched.message && Boolean(errors.message)}
                        helperText={touched.message ? errors.message : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        inputRef={ref}
                    />
                </Grid>  
                <Grid item md={1} xs={1}>
                    <MessageButton
                    
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                        endIcon={<Icon>send</Icon>}
                    >
                        Send
                    </MessageButton>  
                </Grid>
            </Grid>
        </form>
    )
})

export default Form
