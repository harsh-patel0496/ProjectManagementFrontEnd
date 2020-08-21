import React,{ lazy,useEffect,useState } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Typography } from '@material-ui/core';
import { width } from '@material-ui/system';
import SubmitButton from '../../../utils/styledComponent/SubmitButton'
import useAuthentication from '../../../hooks/useAuthentication';
import useCompanyTypes from '../../../hooks/useCompanyTypes';
import { apiCall } from '../../../utils/apiCall';
const CssTextField = lazy( 
    () => import('../../../utils/styledComponent/CssTextField')
);


const useStyles = makeStyles((theme) => ({
    root: {
        width: "50%",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    mb: {
        marginBottom:theme.spacing(4)
    }
}));

function Form(props) {

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        errors,
        values
    } = props

    const classes = useStyles();
    const [companyTypes,setCompanyTypes] = useState([]);
    const [companyTypesFromRudux,setCompanyTypesToRedux] = useCompanyTypes();
    useEffect(() => {

        if(companyTypesFromRudux && companyTypesFromRudux.length > 0){
            setCompanyTypes(companyTypesFromRudux)
        } else {
            const options = {
                method: 'get',
                url: '/companyTypes'
            }
            apiCall(options).then( response => {
                const companyTypes = response.data.companyTypes
                setCompanyTypesToRedux(companyTypes)
                setCompanyTypes(companyTypes)
            }).catch( error => {
                console.log(error)
            })
        }

    },[]);
    const companyType = [{id: 1,title: "I.T Indestry"}]
    //console.log(errors)
    return (
        <React.Fragment>
            <Typography variant="h2" className={classes.mb}>
                Personal Details
            </Typography>
        <form 
            className={classes.root}
            onSubmit={handleSubmit}
        >
            <Grid
                container
                spacing={3} 
            >
                <Grid
                    item
                    md={12}
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
                    md={12}
                    xs={12}
                >
                    
                        <Autocomplete
                            id="combo-box-demo"
                            options={companyTypes}
                            getOptionLabel={(option) => option.title}
                            onChange={(e, value) => {
                                setFieldValue("company_type", value);
                            }}
                            getOptionSelected = {(option,value) => {return true} }
                            renderOption={(option) => (
                                <React.Fragment>
                                  {option.title} 
                                </React.Fragment>
                              )}
                              
                            value={values.company_type}
                            renderInput={
                                (params) => <CssTextField 
                                                {...params} 
                                                variant="outlined" 
                                                placeholder="Company Type"
                                                name="company_type"
                                                error={touched.company_type && Boolean(errors.company_type)}
                                                helperText={touched.company_type ? errors.company_type : ""}
                                                onChange = {handleChange}
                                                onBlur={handleBlur}
                                            />
                                        }
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
                    md={6}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-no_of_users"
                        type="text"
                        placeholder="Number Of Employee"
                        name="no_of_users"
                        error={touched.no_of_users && Boolean(errors.no_of_users)}
                        helperText={touched.no_of_users ? errors.no_of_users : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value = {values.no_of_users}
                    />
                </Grid>      
                <Grid
                    item
                    md={12}
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
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <SubmitButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Edit Profile
                    </SubmitButton>
                </Grid>
            </Grid>
        </form>
        </React.Fragment>
    )
}

export default Form
