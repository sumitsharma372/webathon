import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles'
import { useSelector } from 'react-redux';

// GET THE CURRRENT ID OF THE POST


const Form = ({currentId, setCurrentId}) => {
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null);
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData ] = useState({
    title: '',
    message: '',
    membersRequired: '',
    selectedFile: '',
  })
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(post) {
      setPostData(post)
    }
  }, [post])


  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
    }else{
      dispatch(createPost({...postData, name: user?.result?.name}))
    }
    clear()
  }
  
  const clear = () => {
    setCurrentId(null);
    setPostData({
    title: '',
    message: '',
    membersRequired: '',
    selectedFile: '',
  })
  }



  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign in to post your own competitions 
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} style = {{padding: '1rem'}}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit = {handleSubmit}>

        <Typography textAlign='center' variant='h6'>{currentId ? 'Edit Competition': 'Post a Competition'}</Typography>

        {/* <TextField 
          name = 'creator'  
          variant = 'outlined' 
          label="Creator" 
          fullWidth 
          value={postData.creator} 
          onChange={(e) => setPostData({...postData, creator: e.target.value})}
        /> */}
        <TextField 
          name = 'title'  
          variant = 'outlined' 
          label="Title" 
          fullWidth 
          value={postData.title} 
          onChange={(e) => setPostData({...postData, title: e.target.value})}
        />
        <TextField 
          name = 'message'  
          variant = 'outlined' 
          label="Description" 
          fullWidth 
          value={postData.message} 
          onChange={(e) => setPostData({...postData, message: e.target.value})}
        />
        {/* <TextField 
          name = 'tags'  
          variant = 'outlined' 
          label="Tags" 
          fullWidth 
          value={postData.tags} 
          onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
        /> */}
        <TextField
          name = 'membersRequired'
          variant='outlined'
          label = 'Members Required'
          type='number'
          fullWidth
          value={postData.membersRequired}
          onChange={(e) => setPostData({...postData, membersRequired: e.target.value})}
        />
        <div className={classes.fileInput}>
          <FileBase type='file' multiple = {false} onDone = {({base64}) => setPostData({...postData, selectedFile: base64})} />
        </div>

        <Button className={classes.buttonSubmit} variant = "contained" type = "submit" size = 'large' color = 'primary'>Submit</Button>

        <Button variant = "contained" size = 'small' color = 'secondary' onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form