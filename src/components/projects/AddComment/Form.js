import React,{lazy} from 'react'
import { Grid } from '@material-ui/core';
import SubmitButton from '../../../utils/styledComponent/SubmitButton'
import CommentIcon from '@material-ui/icons/Comment';
import CircularStyledProgress from '../../../utils/styledComponent/CircularStyledProgress'

const CssTextField = lazy( 
    () => import('../../../utils/styledComponent/CssTextField')
);

function Form(props) {

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
        isLoading
    } = props;
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
                        placeholder="Comment"
                        name="comment"
                        error={touched.comment && Boolean(errors.comment)}
                        helperText={touched.comment ? errors.comment : ""}
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
                    <SubmitButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon= {<CommentIcon />}
                        disabled = {isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Comment'}
                    </SubmitButton>
                </Grid>
            </Grid>
        </form>
    )
}

export default Form
