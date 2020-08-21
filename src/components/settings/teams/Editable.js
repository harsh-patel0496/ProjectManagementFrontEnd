import React,{lazy} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const CssTextField = lazy( 
    () => import('../../../utils/styledComponent/CssTextField')
);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />
function Editable(props) {
    const {
        type,
        data
    } = props
    return (
        type === 1 ?
            
            <CssTextField
                fullWidth
                id="filled-name"
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
                value={props.value}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
        : 
        <Autocomplete
            multiple
            id="combo-box-demo"
            options={data}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={(e,value) => {
                props.onChange(value)
            }}
            value={props.value}
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
                                placeholder={type === 2 ? 'Managers' : 'Developers'}
                                name={type === 2 ? 'managers' : 'developers'}
                                
                                //onChange = {e => props.onChange(e.target.value)}
                            />
                        }
        />
    )
}

export default Editable
