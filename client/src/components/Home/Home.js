import React, {useState, useEffect} from 'react'
import { Grow, Container, Grid, Paper, AppBar, TextField, Button } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from '../../styles'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import { margin } from '@mui/system'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'


function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate()
  // const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('')
  const matches = useMediaQuery('(max-width:600px)');
  const maxMatch = useMediaQuery('(min-width: 1024px)')
  const theme = useTheme();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])
  
  const handleKeyPress = (e) => {
    if(e.keyCode ===  13) {
      searchPost()
    }
  }

  const searchPost = () => {
    console.log(search);
    if(search.trim()) {
      // dispatch -> fetch search post
      dispatch(getPostsBySearch({search}))
    }else {
      navigate('/')
    }
  }
  
  return (
    <Grow in>
        <Container maxWidth= 'xl'>
          <Grid direction={matches ? 'column-reverse' : 'row'} className={classes.gridContainer} container justifyContent='center' alignItems='stretch' spacing={3}> 
            <Grid item xs={7} lg={6} sm={6} md={8}>
              <Posts setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid style={{borderRadius: '20px', postition: 'absolute', right: '1rem', top: '10px'}} item xs={12} sm={6} md = {4}>
              <AppBar style={{padding: '1rem', borderRadius: '10px 10px 0 0'}} position='static' color='inherit'>
                <TextField 
                  style = {{marginButtom: '10px'}}
                  name='search'
                  variant='outlined'
                  label = 'Search Competions'
                  fullWidth
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearch(e.target.value)}
                />
              <Button style={{marginTop: '0.3rem'}} variant='contained' onClick={searchPost} color = 'primary'>Search</Button>
              </AppBar>
              <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home