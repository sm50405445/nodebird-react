import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper'
import {Provider} from 'react-redux'
import reducer from '../reducers'
import { createStore, compose,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

const NodeBird = ({Component,store}) => {
    return(
        <Provider store={store}>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.css"/>
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType, //렌더링 되는 모든 것들
    store: PropTypes.object
}

export default withRedux((initialState,options)=>{
    // 여기에다가 store 커스터마이징
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]; //action 과 store 사이에서 동작
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares),)
        : compose( //기존 devtool에 __REDUX_DEVTOOLS_EXTENSION__ 합성해서 추가함
        applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f)=>f,
    );
    const store = createStore(reducer,initialState,enhancer);
    sagaMiddleware.run(rootSaga)
    return store;
})(NodeBird); //NodeBird 컴포넌트에 props로 store 넣어줌