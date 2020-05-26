import {all,fork,takeLatest,call,put,take,delay} from 'redux-saga/effects'
import { LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILED } from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA'

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
    while(true){
        yield take(LOG_IN)
        yield delay(2000)
        yield put({ //saga dispatch
            type: LOG_IN_SUCCESS
    })
    }
    
}

function* watchSignUp(){
    
}

function* watchHello(){
    console.log('before saga')
    while(true){
        yield take(HELLO_SAGA)
        console.log('hello saga')
    }
    //비동기 요청, 타이머 가능
}

export default function* userSaga(){
    yield all([
        watchLogin(),
        watchHello(),
        watchSignUp(),
    ])
}