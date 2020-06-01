import { all, fork, takeLatest, takeEvery, call, put, take, delay, race, cancel, select, throttle, debounce } from 'redux-saga/effects';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';
import axios from 'axios'

function* loginAPI() {
  //서버 요청
  return axios.post('/login')
}

function* login() {
  try {
    yield delay(2000)
    // yield call(loginAPI); //동기호출
    yield put({
      //put dispatch 동일 해당 액션 실행
      type: LOG_IN_SUCCESS,
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function* signUpApi() {
  return axios.post('/signup')
}

function* singUp() {
  try {
    yield call(signUpApi); //동기호출
    yield put({
      //put dispatch 동일 해당 액션 실행
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, singUp);
}

// function* watchHello() {
//   yield takeLatest(HELLO_SAGA, hello);
//   //비동기 요청, 타이머 가능
// }

// function* watchHello(){
//     console.log('before saga')
//     while(true){
//         yield take(HELLO_SAGA)
//         console.log('hello saga')
//     }
//     //비동기 요청, 타이머 가능
// }

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp)
  ]);
}
