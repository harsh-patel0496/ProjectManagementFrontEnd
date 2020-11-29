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
        values
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
                        value={values.name}
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
                        placeholder="Contact Person"
                        name="contact_person"
                        error={touched.contact_person && Boolean(errors.contact_person)}
                        helperText={touched.contact_person ? errors.contact_person : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={values.contact_person}
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
                        value={values.address}
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
                        value={values.email}
                        InputProps={{
                            readOnly:true
                        }}
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
                        value={values.contact_no}
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
                        Add Client
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
