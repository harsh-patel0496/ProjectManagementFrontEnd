import React, { lazy } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
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
        touched,
        errors,
        values
    } = props
    const classes = useStyles();
    //console.log(values)
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
                    md={12}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email ? errors.email : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                            endAdornment: <InputAdornment position="start">
                                                <EmailIcon 
                                                />
                                            </InputAdornment>,
                        }}
                        value={values.email}
                    />
                </Grid>   
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password ? errors.password : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                                <LockIcon 
                                                />
                                            </InputAdornment>,
                        }}
                        
                    />
                </Grid>  
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <CssTextField
                        fullWidth
                        id="filled-password"
                        type="text"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                        onChange = {handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                                <LockIcon 
                                                />
                                            </InputAdornment>,
                        }}
                        
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
                        Submit
                    </Button>
                </Grid>    
            </Grid>
        </form>
    )
}

export default Form
