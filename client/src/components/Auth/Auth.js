import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, Box } from '@mui/material'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles'
import Input from './Input';
import Icon from './icon'
import { signin, signup } from '../../actions/auth.js'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowpassword ] = useState(false)
    const [isSignup, setIsSignup ] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const clientId = '89872641534-2at7jk81m59ftucskeq945mi59hvqtkv.apps.googleusercontent.com'

    useEffect(() => {
         const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formData, navigate))
        }else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleShowPassword = () => setShowpassword(prevShowPassword => !prevShowPassword)

    const switchMode = () => {
        setIsSignup(prevIsSignup => !prevIsSignup)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    const googleFailure = (error) => {
        console.log('Error', error)
    }   

    // "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."  "FOUND THIS ERROR DURING DEVELOPMENT OF GOOGLE LOGIN"

  return (
    <Container component='main' maxWidth = 'xs'>
        <Paper style={{padding: '1rem'}} className={classes.paper} elevation = {3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography marginBottom='1rem' variant='h5'>{isSignup ? 'Sign Up': 'Sign In'}</Typography>
            <form className={classes.form} onSubmit = {handleSubmit}>
                <Grid container spacing={2}>
                    {isSignup && (
                        <>
                            <Input name = 'firstName' label = 'First Name' handleChange={handleChange} autoFocus half />
                            <Input name = 'lastName' label = 'Last Name' handleChange={handleChange} half />
                        </>
                    )}
                    <Input name = 'email' label = 'Email Address' handleChange={handleChange} type = 'email'/>
                    <Input name = 'password' label = 'Password' handleChange={handleChange} type = { showPassword ? 'text' : 'password' } handleShowPassword = {handleShowPassword}/>
                    {isSignup && <Input name='confirmPassword' label = "Confirm Password" handleChange = {handleChange} type = "password"/>}
                </Grid>
                <Box style={{width: '100%',display: 'flex', justifyContent: 'center'}}>
                    <Button style={{marginLeft: '25px', marginTop: '10px', marginBottom: '10px'}}  type = 'submit' variant='contained' color = 'primary' className = {classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                </Box>

                    <GoogleLogin
                        clientId={clientId}
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color = 'primary' 
                            fullWidth 
                            onClick = {renderProps.onClick} 
                            disabled = {renderProps.disabled} 
                            startIcon = {<Icon />} 
                            variant = 'contained'
                            >
                                Google Sign In
                            </Button>
                        )}
                    
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />    

                    
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Dont't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
            </form>

        </Paper>
    </Container>
  )
}

export default Auth