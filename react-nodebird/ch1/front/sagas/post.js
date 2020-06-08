import {all,fork,takeLatest,delay} from 'redux-saga/effects'
import {ADD_POST_REQUEST, ADD_POST_FAILURE} from '../reducers/post'

function* addPost(){
    try{
        yield delay(2000)
        yield put({
            type:ADD_POST_REQUEST
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
    yield takeLatest();
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
    ])
}