import { all, fork, takeLatest, takeEvery, call, put, take, delay, race, cancel, select, throttle, debounce } from 'redux-saga/effects';
import { 
  LOG_IN_SUCCESS, 
  LOG_IN_FAILURE, 
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS, 
  SIGN_UP_REQUEST, 
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE, 
} from '../reducers/user';
import axios from 'axios'

function loginAPI(loginData) {
  //서버 요청
  return axios.post('/user/login',loginData,{
    withCredentials:true,
  })
}

function* login(action) {
  try {
    // yield delay(2000)
    // yield call(loginAPI); //동기호출
    const result = yield call(loginAPI,action.data)
    console.log('result',result)
    yield put({
      //put dispatch 동일 해당 액션 실행
      type: LOG_IN_SUCCESS,
      data: result.data,
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

function signUpApi(signUpData) {
  return axios.post('/user/',signUpData)
}

function* singUp(action) { //action에 userId nickname 등이 담김
  try {
    yield call(signUpApi,action.data); //동기호출

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

function logOutApi() {
  //서버는 로그인 여부를 프론트에서 보내는 쿠키로 확인
  return axios.post('/user/logout',{}/*data */,{//options
    withCredentials:true
  })
}

function* logOut(action) { //action에 userId nickname 등이 담김
  try {
    yield call(logOutApi); //동기호출

    yield put({
      //put dispatch 동일 해당 액션 실행
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error:error
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function loadUserApi(loadUserData) {
  //서버는 로그인 여부를 프론트에서 보내는 쿠키로 확인
  return axios.get('/user/',{
    withCredentials:true,
  })
}

function* loadUser() { //action에 userId nickname 등이 담김
  try {
    const result = yield call(loadUserApi)
    yield put({
      //put dispatch 동일 해당 액션 실행
      type: LOAD_USER_SUCCESS,
      data:result.data,
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: LOAD_USER_FAILURE,
      error:error
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
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
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignUp)
  ]);
}
