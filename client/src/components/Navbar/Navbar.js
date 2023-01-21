import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material'
import useStyles from './styles'
import memories from '../../images/memories.jpg'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    navigate('/')
    setUser(null)
  }


  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp*1000 < new Date().getTime()) logout();
    }


    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
   <AppBar style={{display: 'flex', flexDirection: 'row'}} className = {classes.appBar} position='static' color='inherit'>
    <div className={classes.brandContainer}>
        <Typography fontFamily='Arial'  component={Link} to='/' className={classes.heading} variant='h2' align='center'>
          COMPO
        </Typography>
    </div>
    <Toolbar className = {classes.toolbar}>
      {user ? (
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt = {user.result.name} src = {user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant = 'h6'>{user.result.name}</Typography>
          <Button variant='contained' className={classes.logout} color = 'secondary' onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Button component = {Link} to = '/auth' variant='contained' color = 'primary'>Sign In</Button>
      )}
    </Toolbar>
      </AppBar>
  )
}

export default Navbar