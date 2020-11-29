import React,{lazy,useState,useEffect} from 'react'
import {Grid ,Button} from '@material-ui/core';
//import SubmitButton from '../../../../utils/styledComponent/SubmitButton'
import { apiCall } from '../../../../utils/apiCall'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const CssTextField = lazy( 
    () => import('../../../../utils/styledComponent/CssTextField')
);
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />
function Form(props) {
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        errors,
        setErrors,
        values,
        //label
    } = props

    const [developers,setDevelopers] = useState([]);
    const [managers,setManagers] = useState([]);

    useEffect(() => {
        const options = {
            url: '/teams/getListOfEmployee',
            method: 'get'
        }
        apiCall(options).then(response => {
            if(response.data.employees && response.data.employees.managers){
                setManagers(response.data.employees.managers)
            }
            if(response.data.employees && response.data.employees.developers){
                setDevelopers(response.data.employees.developers)
            }
        }).catch( error => {
            console.log(error)
        })
    },[])

    const validateUniqueName = () => {
        const options = {
            url: '/teams/validateTeamName',
            method: 'post',
            data: {
                data: {
                    id: values.id,
                    edit: true,
                    name: values.name
                }
            }
        }
        apiCall(options).then((response) => {
            if(response.data.status){
                delete errors.name
                
            } else {
                setErrors({...errors,name:response.data.message})
            }
        }).catch((error) => {
            setErrors({...errors,name:"The name has already been used."})
        })
    }
    return (
        <form 
            onSubmit={(e) => {
                validateUniqueName()
                handleSubmit(e)
            }}
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
                        onBlur={(e) => {
                            validateUniqueName()
                            handleBlur(e)
                        }}
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
                    <CssTextField
                        fullWidth
                        id="filled-address"
                        type="text"
                        placeholder="Description"
                        name="description"
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description ? errors.description : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        multiline
                        rows={3}
                        value={values.description}
                    />
                </Grid> 
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Autocomplete
                        multiple
                        id="combo-box-demo"
                        options={managers}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => {
                            setFieldValue("managers", value);
                        }}
                        value={values.managers}
                        getOptionSelected = {(option,value) => {
                            return option.id === value.id
                        } }
                        renderOption={(option,{ selected }) => (
                            <React.Fragment>
                                <Checkbox 
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name} 
                            </React.Fragment>
                            )}
                            
                        renderInput={
                            (params) => <CssTextField 
                                            {...params} 
                                            variant="outlined" 
                                            placeholder="Managers"
                                            name="managers"
                                            error={touched.managers && Boolean(errors.managers)}
                                            helperText={touched.managers ? errors.managers : ""}
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
                    <Autocomplete
                        multiple
                        id="combo-box-demo"
                        options={developers}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => {
                            setFieldValue("developers", value);
                        }}
                        value={values.developers}
                        getOptionSelected = {(option,value) => {
                            return option.id === value.id
                        }}
                        renderOption={(option,{ selected }) => (
                            <React.Fragment>
                                <Checkbox 
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name} 
                            </React.Fragment>
                            )}
                            
                        renderInput={
                            (params) => <CssTextField 
                                            {...params} 
                                            variant="outlined" 
                                            placeholder="Developers"
                                            name="developers"
                                            error={touched.developers && Boolean(errors.developers)}
                                            helperText={touched.developers ? errors.developers : ""}
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
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        {`Edit ${props.label}`}
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
