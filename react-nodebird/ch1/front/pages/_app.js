import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import withReduxSaga from 'next-redux-saga'
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { initialState } from '../reducers/post';
import { options } from '../../back/routes/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import axios from 'axios';

const NodeBird = ({ Component, store,pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.css"
        />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType, //렌더링 되는 모든 것들
  store: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};

NodeBird.getInitialProps = async(context) => {
  console.log(context)
  const {ctx,Component} = context
  let pageProps
  const state = ctx.store.getState()
  const cookie = ctx.isServer?ctx.req.headers.cookie:''
  console.log('cookie',cookie)
  if(ctx.isServer && cookie){
    axios.defaults.headers.Cookie = cookie
  }
  if(!state.user.me){
    ctx.store.dispatch({
      type:LOAD_USER_REQUEST,
    })
  }
  if(Component.getInitialProps){ //page들 component인데 각각 컴포넌트 안에 getInitialProps 있으면 실행해줌
    pageProps = await Component.getInitialProps(ctx)
  }
  
  return {pageProps}
}

const configureStore = (initialState,options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware,(store)=>(next)=>(action)=>{
    console.log(action)
    next(action)
  }]; //action 과 store 사이에서 동작
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
          //기존 devtool에 __REDUX_DEVTOOLS_EXTENSION__ 합성해서 추가함
          applyMiddleware(...middlewares),
          !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store;
}

export default withRedux(configureStore)(withReduxSaga(NodeBird)); //NodeBird 컴포넌트에 props로 store 넣어줌
