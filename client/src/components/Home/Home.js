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


function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate()
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('')

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
          <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}> 
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md = {3}>
              {/* <AppBar className={classes.appBarSearch} position = 'static' color='inheri'>
                <TextField
                  name='search'
                  variant='outlined'
                  label='Search Memories'
                  fullWidth
                  value="TEST"
                  onChange={() => {}}
                />
              </AppBar> */}
              <AppBar style={{padding: '1rem'}} position='static' color='inherit'>
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
                 {/* <ChipInput
                style={{margin: '10px 0'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label= 'Search Tags'
                variant='outlined'
              /> */}

              <Button style={{marginTop: '0.3rem'}} variant='contained' onClick={searchPost} color = 'primary'>Search</Button>
              </AppBar>
              <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
              {/* <Paper className={classes.pagination} elevation={6}>
                <Pagination />
              </Paper> */}
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home