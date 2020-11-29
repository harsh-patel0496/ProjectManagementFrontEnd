import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const MessageTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: "50px",
        '&.Mui-focused fieldset': {
          borderColor: '#666666',
        },
      },
    },
})(TextField);

export default MessageTextField

