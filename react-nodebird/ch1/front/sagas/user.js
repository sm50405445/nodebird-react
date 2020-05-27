import {all,fork,takeLatest,takeEvery,call,put,take,delay,race,cancel,select,throttle,debounce} from 'redux-saga/effects'
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST } from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA'

function* loginAPI(){
    //서버 요청
}

function* login(){
    try {
        yield call(loginAPI) //동기호출
        yield put({ //put dispatch 동일 해당 액션 실행
            type: LOG_IN_SUCCESS
        })
    } catch (error) { //서버 요청 실패
        console.error(error)
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

function* watchLogin(){
    takeEvery(LOG_IN_REQUEST,login)
}

function* watchSignUp(){
    yield takeEvery(HELLO_SAGA,function*(){
        console.log(1)
        console.log(1)
        console.log(1)
        console.log(1)
    })
}

function* hello(){
    yield delay(1000)
    yield put({
        type:'BYE_SAGA'
    })
}

function* watchHello(){
    yield takeLatest(HELLO_SAGA,hello)
    //비동기 요청, 타이머 가능
}

// function* watchHello(){
//     console.log('before saga')
//     while(true){
//         yield take(HELLO_SAGA)
//         console.log('hello saga')
//     }
//     //비동기 요청, 타이머 가능
// }

// function* watchHello(){
//     console.log('before saga')
//     while(true){
//         yield take(HELLO_SAGA)
//         console.log('hello saga')
//     }
//     //비동기 요청, 타이머 가능
// }

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchHello),
        // watchSignUp(),
    ])
}