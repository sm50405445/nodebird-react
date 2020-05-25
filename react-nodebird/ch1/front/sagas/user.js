import {all,fork} from 'redux-saga/effects'
import { LOG_IN } from '../reducers/user'

function* loginAPI(){
    //서버 요청
}

function* login(){
    try {
        yield call(loginAPI)
        yield put({ //put dispatch 동일 해당 액션 실행
            type: LOG_IN_SUCCESS
        })
    } catch (error) { //서버 요청 실패
        console.error(error)
        yield put({
            type: LOG_IN_FAILED
        })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN,login)
}

export default function* postSaga(){
    yield all([
        fork(watchLogin),
    ])
}