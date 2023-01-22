import React, {useEffect, useState} from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Alert, Collapse, Select, MenuItem, Menu, InputLabel, FormControl, Tooltip} from '@mui/material'
import moment from 'moment'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deletePost, deleteVote, likePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import compo from '../../../images/compo.jpg'
import { Box } from '@mui/system';
import Zoom from '@mui/material/Zoom';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch()
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [votesFull, setVotesFull] = useState(false); 

    useEffect(() => {
      if (post.likes.length === post.membersRequired + 20) {
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
          } &nbsp; {post.likes.length} {post.likes.length === 1 ? 'Request' : 'Requests'}
        </>
        )
      }
      return <>
        {post.likes.includes(`${user?.result.googleId || user?.result._id} ${user?.result.name}`) ?  
        <ThumbUpAltIcon fontSize='small' />
        :
        <ThumbUpAltOutlinedIcon fontSize='small' />
        } &nbsp; Request 
      </>
    }

  return (
    <Card className={classes.card}>
      <CardMedia className = {classes.media} image={post.selectedFile ? post.selectedFile : compo} title = {post.title}/>
      <div style={{background: '#dddae6', padding: '1px 5px', borderRadius: '5px', color: '#4212b3',}} className={classes.overlay}>
        <Typography style = {{textTransform: 'capitalize', marginBottom: '2px'}} variant='h6'>{post.name}</Typography>
        <Typography fontFamily='Poppins' fontWeight='500' variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size='small' onClick = {() => {
          setCurrentId(post._id)
          window.scrollTo(0,0)
        }}>
          <Tooltip title={<h4 style={{padding: '0 4px'}}>UPDATE</h4>} arrow TransitionComponent={Zoom}>
            <MoreHorizIcon fontSize='large' />
          </Tooltip>
        </Button>
      </div>
      )}
        <CardContent>
        <Typography textAlign='left' className={classes.title} style = {{textTransform: 'capitalize', background: '#d4d6d6', borderRadius: '5px', padding: '5px 8px', marginLeft: '-10px', fontWeight: '500', color: '#39236b'}} fontSize = '2.2rem' fontFamily='Poppins' variant='h5' gutterBottom>{post.title}</Typography>

        <Typography style={{background: '#e1f4f5', borderRadius: '4px', padding: '8px', marginLeft: '-10px', marginBottom: '15px'}} variant='body2' 
        fontSize='1.1rem' color='textSecondary' gutterBottom>{post.message.length > 100 ? `${post.message.substring(0,100)}...`: post.message}</Typography>
        
        <Typography fontFamily='Poppins' variant='body' style = {{margin: '20px 0 0 -5px', marginTop: '10px', paddingTop: '10px'}} color='primary' gutterBottom>
          Members Required: <strong style={{color:'#8e33e8'}}>{post.membersRequired}</strong>
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
              <MenuItem style={{display: 'flex', justifyContent: 'space-between'}}>
               <Typography>{member.split(' ').slice(1).join(" ")}</Typography>
               <Box display='flex' gap = '-30px'>
                <Button>
                <DoneOutlineOutlinedIcon />
               </Button>
               <Button onClick={() =>dispatch(deleteVote(post._id, member))}>
                <DeleteIcon/>
               </Button>
               </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        )
        }
    </Card>
  )
}

export default Post