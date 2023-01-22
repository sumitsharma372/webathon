import * as api from '../api'
import { FETCH_ALL, UPDATE, DELETE, CREATE, LIKE } from '../constants/actionTypes';

// action creators

export const getPosts = () => async (dispatch) =>{
    try {
        const { data } = await api.fetchPosts();
        dispatch( { type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) =>{
    try {
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id, name) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id, name)

        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteVote = (id, vote) => async(dispatch) => {
    try {
        const { data } = await api.deleteVote(id, vote)
        
        dispatch({type: 'DELETE_VOTE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}