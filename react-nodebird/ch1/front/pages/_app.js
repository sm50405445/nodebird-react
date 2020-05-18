import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper'
import {Provider} from 'react-redux'
import reducer from '../reducers'
import { createStore } from 'redux'

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
    const store = createStore(reducer,initialState);
    // 여기에다가 store 커스터마이징
    return store;
})(NodeBird); //NodeBird 컴포넌트에 props로 store 넣어줌