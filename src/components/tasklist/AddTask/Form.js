import React,{lazy, useState, useEffect} from 'react'
import { 
    Grid,
    //TextField,
    Button 
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { apiCall } from '../../../utils/apiCall'

const CssTextField = lazy( 
    () => import('../../../utils/styledComponent/CssTextField')
);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />

function Form(props) {

    const {
        errors,
        //values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props

    const [teams,setTeams] = useState([]);
    const [selectedTeam,setSelectedTeam] = useState({})

    useEffect(() => {
        const options = {
            url: '/projects/getListOfTeamsAndClients',
            method: 'get'
        }
        apiCall(options).then(response => {
            if(response.data.assembly && response.data.assembly.teams){
                console.log(response.data.assembly.teams);
                setTeams(response.data.assembly.teams)
            }
        }).catch( error => {
            console.log(error)
        })
    },[])
    return (
        <form onSubmit={handleSubmit}>
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
                                //validateUniqueName()
                                handleBlur(e)
                            }}
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
                        />
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <Autocomplete
                            id="combo-box-demo"
                            options={teams}
                            //disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => {
                                setSelectedTeam(value)
                                setFieldValue("team", value);
                            }}
                            getOptionSelected = {(option,value) => (option.id === value.id) }
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
                                                placeholder="Team"
                                                name="team"
                                                error={touched.team && Boolean(errors.team)}
                                                helperText={touched.team ? errors.team : ""}
                                                onChange = {handleChange}
                                                onBlur={handleBlur}
                                            />
                                        }
                            />
                    </Grid>
                    {selectedTeam && selectedTeam.managers && 
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Autocomplete
                                multiple
                                id="combo-box-demo"
                                options={selectedTeam.managers}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => {
                                    setFieldValue("managers", value);
                                }}
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
                    }
                    {selectedTeam && selectedTeam.developers && 
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Autocomplete
                                multiple
                                id="combo-box-demo"
                                options={selectedTeam.developers}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => {
                                    setFieldValue("developers", value);
                                }}
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
                    }
                    <Grid item xs={12} sm={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                        >
                            {`Add Task`}
                        </Button>
                    </Grid>
            </Grid>
        </form>
    )
}

export default Form
