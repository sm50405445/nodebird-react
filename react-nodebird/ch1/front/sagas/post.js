import { all, fork, takeLatest, takeEvery, call, put, take, delay, race, cancel, select, throttle, debounce } from 'redux-saga/effects';
import axios from 'axios'
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_FAILURE, 
    ADD_COMMENT_SUCCESS,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
} from '../reducers/post'

function addPostAPI(postData){
    console.log('post',postData)
    return axios.post('/post',postData,{
        withCredentials:true,
    })
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI,action.data)
        console.log('postresult',result)
        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data,
        })
    }
    catch(err){
        yield({
            type:ADD_POST_FAILURE,
            error: err,
        })
    }
}

function* watchAddPost(){
    yield takeEvery(ADD_POST_REQUEST,addPost);
}

function loadMainPostsAPI(){
    return axios.get('/posts')
}

function* loadMainPosts(action){
    try{
        const result = yield call(loadMainPostsAPI,action.data)
        yield put({
            type:LOAD_MAIN_POSTS_SUCCESS,
            data:result.data,
        })
    }
    catch(err){
        yield({
            type:LOAD_MAIN_POSTS_FAILURE,
            error: err,
        })
    }
}

function* watchLoadMainPosts(){
    yield takeEvery(LOAD_MAIN_POSTS_REQUEST,loadMainPosts);
}

function addCommentAPI(){
    
}

function* addComment(action){
    try{
        yield delay(2000)
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:{
                postId:action.data.postId,
            }
        })
    }
    catch(err){
        yield({
            type:ADD_COMMENT_FAILURE,
            error: err,
        })
    }
}

function* watchAddComment(){
    yield takeEvery(ADD_COMMENT_REQUEST,addComment);
}

export default function* postSaga(){
    yield all([
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}