import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import {Form} from 'antd'

const Signup = () =>{
    return <>
    <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.css"/>
    </Head>
    <AppLayout>
    
        <Form onSubmit = {on}>
            회원가입
        </Form>

    </AppLayout>
    </>
}

export default Signup