import React, {useEffect, useState} from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Alert, Collapse, Select, MenuItem, Menu, InputLabel, FormControl, Tooltip} from '@mui/material'
import moment from 'moment'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deletePost, likePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import compo from '../../../images/compo.jpg'
import { Box } from '@mui/system';
import Dropdown from 'react-dropdown'
import Zoom from '@mui/material/Zoom';

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch()
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [votesFull, setVotesFull] = useState(false); 

    useEffect(() => {
      if (post.likes.length === post.membersRequired) {
        setVotesFull(true)
      }else{
        setVotesFull(false)
      }
    }, [votesFull, post.likes.length,post.membersRequired])

    // console.log(votesFull)

    const Likes = () => {
      if (post.likes.length > 0) {
        return (
        <>
          {post.likes.includes(`${user?.result.googleId || user?.result._id} ${user?.result.name}`) ?  
          <ThumbUpAltIcon fontSize='small' />
          :
          <ThumbUpAltOutlinedIcon fontSize='small' />
          } &nbsp; {post.likes.length} {post.likes.length === 1 ? 'Vote' : 'Votes'}
        </>
        )
      }
      return <>
        {post.likes.includes(`${user?.result.googleId || user?.result._id} ${user?.result.name}`) ?  
        <ThumbUpAltIcon fontSize='small' />
        :
        <ThumbUpAltOutlinedIcon fontSize='small' />
        } &nbsp; Vote 
      </>
    }

  return (
    <Card className={classes.card}>
      <CardMedia className = {classes.media} image={post.selectedFile ? post.selectedFile : compo} title = {post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size='small' onClick = {() => setCurrentId(post._id)}>
          <Tooltip title={<h4 style={{padding: '0 4px'}}>UPDATE</h4>} arrow TransitionComponent={Zoom}>
            <MoreHorizIcon fontSize='large' />
          </Tooltip>
        </Button>
      </div>
      )}
        <CardContent>
        <Typography textAlign='left' className={classes.title} style = {{textTransform: 'capitalize'}} variant='h5' gutterBottom>{post.title}</Typography>
        <Typography variant='body2' color='textSecondary' gutterBottom>{post.message.length > 100 ? `${post.message.substring(0,100)}...`: post.message}</Typography>
        <Typography variant='h6' color='secondary' gutterBottom>
          Members Required: {post.membersRequired}
        </Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Box display='flex' gap='10px' >
          <Button disabled={(user?.result?.googleId === post?.creator || user?.result._id === post?.creator || (votesFull && !(post.likes.includes(`${user?.result.googleId || user?.result._id} ${user?.result.name}`))))} size='small' color='primary' onClick={() => dispatch(likePost(post._id, user?.result.name))}>
            <Likes />
          </Button>
          {votesFull && <Alert sx = {{borderRadius: '15px'}} severity="warning">FULL</Alert>}
          
          </Box>

          {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small'/>
            &nbsp; Delete
          </Button>
          )}
        </CardActions>

        {((user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && post.likes.length > 0) && (
          // <Dropdown placeholder='View Votes' options = {post.likes.map(member => member.split(' ').slice(1).join(" "))} />
         <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">View Votes</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            label="View Votes"
          >
            {post.likes.map(member => (
              <MenuItem>{member.split(' ').slice(1).join(" ")}</MenuItem>
            ))}
          </Select>
        </FormControl>
        )
        }
    </Card>
  )
}

export default Post