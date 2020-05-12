import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import PropTypes from 'prop-types'

const NodeBird = ({Component}) => {
    return(
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.css"/>
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType, //렌더링 되는 모든 것들

}

export default NodeBird;