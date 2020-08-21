import React,{ lazy,useState,useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useCompanyTypes from '../../../hooks/useCompanyTypes'
import { apiCall } from '../../../utils/apiCall'
const CssTextField = lazy( 
    () => import('../../../utils/styledComponent/CssTextField')
);

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            margin:'10px' 
        } 
        //overflow: 'hidden',
      }
}));

function Form(props) {

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        errors
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

    return (
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
                        id="filled-password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password ? errors.password : ""}
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
                        Signup
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Form
