import React,{useCallback,useState} from 'react'
import {Menu,Input, Button,Row,Col,Card,Avatar,Form} from 'antd'
import Link from 'next/link'
import {useInput} from '../pages/signup'

const LoginForm = () => {

    const [id,onChangeId] = useInput('')
    const [password,onChangePassword] = useInput('')

    const onSubmitForm = useCallback(() => {
        console.log({
            id,password
        })
    },[id,password])

    return(
        <Form onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId} required></Input>
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" value={password} onChange={onChangePassword} type="password" required></Input>
            </div>
            <div>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    )
}

export default LoginForm