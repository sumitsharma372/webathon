import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    marginRight: '-30px'
  },
  profile: {
    display: 'flex',
    justifyContent: 'center',
    width: '400px',
    gap: '1rem'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  // purple: {
  //   color: theme.palette.getContrastText(deepPurple[500]),
  //   backgroundColor: deepPurple[500],
  // },
}));