import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  paper: {
    display: 'flex',
    backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    '& .MuiTextField-root': {
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    color: 'black'
  }
}));