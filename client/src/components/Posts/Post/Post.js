import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import moment from 'moment'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deletePost, likePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import compo from '../../../images/compo.jpg'

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch()
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    // console.log((user?.result?.googleId === post?.creator || user?.result._id === post?.creator))    

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <>
            <ThumbUpAltIcon fontSize='small' /> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
          </>
        ) : (
          <>
          <ThumbUpAltIcon fontSize='small' /> &nbsp; {post.likes.length} {post.likes.length === 1 ? 'Vote' : 'Votes'}
          </>
        )
      }
      return <>
        <ThumbUpAltIcon fontSize='small' /> &nbsp; Vote 
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
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      )}

      {/* <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => `#${tag} `)}</Typography>
      </div> */}

        <CardContent>
        <Typography textAlign='left' className={classes.title} style = {{textTransform: 'capitalize'}} variant='h5' gutterBottom>{post.title}</Typography>
        <Typography variant='body2' color='textSecondary' gutterBottom>{post.message}</Typography>
        <Typography variant='h6' color='secondary' gutterBottom>
          Members Required: {post.membersRequired}
        </Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button disabled={(user?.result?.googleId === post?.creator || user?.result._id === post?.creator)} size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small'/>
            &nbsp; Delete
          </Button>
          )}
        </CardActions>
    </Card>
  )
}

export default Post