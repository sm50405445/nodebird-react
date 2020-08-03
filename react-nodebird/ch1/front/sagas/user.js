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
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE, 
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
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

function loadUserApi(userId) {
  //서버는 로그인 여부를 프론트에서 보내는 쿠키로 확인
  return axios.get(userId?`/user/${userId}`:'/user/',{
    withCredentials:true, //클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉
  })
}

function* loadUser(action) { //action에 userId nickname 등이 담김
  try {
    const result = yield call(loadUserApi,action.data)
    yield put({
      //put dispatch 동일 해당 액션 실행
      type: LOAD_USER_SUCCESS,
      data:result.data,
      me:!action.data,
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

function followUserApi(userId) {
  return axios.post(`/user/${userId}/follow`,{},{
    withCredentials:true,
  })
}

function* followUser(action) { //action에 userId nickname 등이 담김
  try {
    const result = yield call(followUserApi,action.data); //동기호출

    yield put({
      type:FOLLOW_USER_SUCCESS,
      data:result.data
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error:error,
    });
  }
}

function* watchFollowUser() {
  yield takeEvery(FOLLOW_USER_REQUEST, followUser);
}

function unfollowUserApi(userId) {
  return axios.delete(`/user/${userId}/follow`,{},{
    withCredentials:true,
  })
}

function* unFollowUser(action) { //action에 userId nickname 등이 담김
  try {
    const result = yield call(unfollowUserApi,action.data); //동기호출

    yield put({
      type:UNFOLLOW_USER_SUCCESS,
      data:result.data
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error:error,
    });
  }
}

function* watchUnfollowUser() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unFollowUser);
}

function loadFollowersApi(userId) {
  return axios.get(`/user/${userId || 0}/followers`,{},{
    withCredentials:true,
  })
}

function* loadFollowers(action) { //action에 userId nickname 등이 담김
  try {
    const result = yield call(loadFollowersApi,action.data); //동기호출

    yield put({
      type:LOAD_FOLLOWERS_SUCCESS,
      data:result.data
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error:error,
    });
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsApi(userId) {
  return axios.get(`/user/${userId || 0}/followings`,{},{
    withCredentials:true,
  })
}

function* loadFollowings(action) { //action에 userId nickname 등이 담김
  try {
    const result = yield call(loadFollowingsApi,action.data); //동기호출

    yield put({
      type:LOAD_FOLLOWINGS_SUCCESS,
      data:result.data
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error:error,
    });
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerApi(userId) {
  return axios.delete(`/user/${userId}/follower`,{},{
    withCredentials:true,
  })
}

function* removeFollower(action) { //action에 userId nickname 등이 담김
  try {
    const result = yield call(removeFollowerApi,action.data); //동기호출

    yield put({
      type:REMOVE_FOLLOWER_SUCCESS,
      data:result.data
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error:error,
    });
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameApi(nickname) {
  return axios.patch(`/user/nickname`,{nickname},{
    withCredentials:true,
  })
}

function* editNickname(action) { //action에 userId nickname 등이 담김
  try {
    const result = yield call(editNicknameApi,action.data); //동기호출

    yield put({
      type:EDIT_NICKNAME_SUCCESS,
      data:result.data
    });
  } catch (error) {
    //서버 요청 실패
    console.error(error);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error:error,
    });
  }
}

function* watchEditNickname() {
  yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
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
    fork(watchSignUp),
    fork(watchFollowUser),
    fork(watchUnfollowUser),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
