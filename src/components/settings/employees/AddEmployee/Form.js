import React,{lazy} from 'react'
import {Grid ,Button} from '@material-ui/core';
//import SubmitButton from '../../../../utils/styledComponent/SubmitButton'
const CssTextField = lazy( 
    () => import('../../../../utils/styledComponent/CssTextField')
);

function Form(props) {
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        //setFieldValue,
        touched,
        errors,
        //label
    } = props
    return (
        <form 
            onSubmit={handleSubmit}
        >
            <Grid
                container
                spacing={3} 
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-name"
                        type="text"
                        placeholder="Name"
                        name="name"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name ? errors.name : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>   
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-name"
                        type="text"
                        placeholder="Qualification e.x(BCA,MCA,B.E.(IT))"
                        name="qualification"
                        error={touched.qualification && Boolean(errors.qualification)}
                        helperText={touched.qualification ? errors.qualification : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid> 
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-address"
                        type="text"
                        placeholder="Specilization"
                        name="specilization"
                        error={touched.specilization && Boolean(errors.specilization)}
                        helperText={touched.specilization ? errors.specilization : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                </Grid> 
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-address"
                        type="text"
                        placeholder="Address"
                        name="address"
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address ? errors.address : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>      
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-email"
                        type="text"
                        placeholder="Email"
                        name='email'
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email ? errors.email : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-contact_no"
                        type="text"
                        placeholder="Contact Number"
                        name="contact_no"
                        error={touched.contact_no && Boolean(errors.contact_no)}
                        helperText={touched.contact_no ? errors.contact_no : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        {`Add ${props.label}`}
                    </Button>
                    {/* <SubmitButton
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Add
                    </SubmitButton> */}
                </Grid>
            </Grid>
        </form>
    )
}

export default Form
