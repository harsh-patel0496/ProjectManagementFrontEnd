import React,{lazy,useState,useEffect} from 'react'
import {Grid ,Button} from '@material-ui/core';
import SubmitButton from '../../../utils/styledComponent/SubmitButton'
import { apiCall } from '../../../utils/apiCall'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Field } from "formik";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const CssTextField = lazy( 
    () => import('../../../utils/styledComponent/CssTextField')
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
        values
    } = props

    const [teams,setTeams] = useState([]);
    const [clients,setClients] = useState([]);
    
    useEffect(() => {
        const options = {
            url: '/projects/getListOfTeamsAndClients',
            method: 'get'
        }
        apiCall(options).then(response => {
            if(response.data.assembly && response.data.assembly.teams){
                setTeams(response.data.assembly.teams)
            }
            if(response.data.assembly && response.data.assembly.clients){
                setClients(response.data.assembly.clients)
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
    
    const DatePickerField = ({ field, form, ...other }) => {
        return(<DatePicker
            fullWidth
            clearable
            disablePast
            label="Start Date"
            inputVariant="outlined"
            value={field.value ? field.value : null}
            onChange={date => {
                if(date){
                    delete errors.start_date
                    delete touched.start_date
                }
                setFieldValue(field.name, date, false)
            }}
            error={touched.start_date && Boolean(errors.start_date)}
            helperText={touched.start_date ? errors.start_date : ""}
            {...other}
        />)
        
    }  

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form 
                onSubmit={(e) => {
                    //validateUniqueName()
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
                            placeholder="Title"
                            name="title"
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title ? errors.title : ""}
                            onChange = {handleChange}
                            onBlur={(e) => {
                                //validateUniqueName()
                                handleBlur(e)
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={values.title}
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
                            <Field name="start_date" component={DatePickerField}/>
                        </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <Autocomplete
                            id="combo-box-demo"
                            options={clients}
                            //disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => {
                                setFieldValue("client", value);
                            }}
                            getOptionSelected = {(option,value) => (option.id === value.id) }
                            value={values.client}
                            renderOption={(option,{ selected }) => (
                                <React.Fragment>
                                    {/* <Checkbox 
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    /> */}
                                    {option.name} 
                                </React.Fragment>
                                )}
                                
                            renderInput={
                                (params) => <CssTextField 
                                                {...params} 
                                                variant="outlined" 
                                                placeholder="Client"
                                                name="client"
                                                error={touched.client && Boolean(errors.client)}
                                                helperText={touched.client ? errors.client : ""}
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
                            options={teams}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => {
                                setFieldValue("teams", value);
                            }}
                            value={values.teams}
                            getOptionSelected = {(option,value) => (option.id === value.id) }
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
                                                placeholder="Teams"
                                                name="teams"
                                                error={touched.teams && Boolean(errors.teams)}
                                                helperText={touched.teams ? errors.teams : ""}
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
                            {`Edit Project`}
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
        </MuiPickersUtilsProvider>
    )
}

export default Form
