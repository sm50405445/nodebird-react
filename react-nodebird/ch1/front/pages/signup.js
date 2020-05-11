import React,{useState} from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import {Form, Input,Checkbox, Button} from 'antd'

const Signup = () =>{
    
    const [nick,setNick] = useState('')
    const [password,setPassword] = useState('')
    const [passwordCheck,setPasswordCheck] = useState('')
    const [term,setTerm] = useState(true)
    const [passwordError,setPasswordError] = useState(false)
    const [termError,setTermError] = useState(false)

    const onSubmit = () => {
        if(password !== passwordCheck){
            return setPasswordError(true)
        }
        if(!term){
            return setTermError(true)
        }
        console.log({
            id,
            password,
            nick,
            term
        })
        
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeNick = (e) => {
        setNick(e.target.value)
    }

    const onChangePasswordChk = (e) => {
        setPasswordError(e.target.value !== password)
        setPasswordCheck(e.target.value)
    }

    const onChangeTerm = (e) => {
        setTermError(false)
        setTerm(e.target.checked)
    }

    const useInput = (initValue = null) => {
        const [value,setter] = useState(initValue)
        const handler = (e) => {
            setter(e.target.value)
        }
        return [value,handler]
    }
    const [id,onChangeId] = useInput('')

    return <>
    <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.css"/>
    </Head>
    <AppLayout>
        <Form onFinish={onSubmit} style={{padding:10}}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} required onChange={onChangeId}></Input>
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br/>
                <Input name="user-nick" value={nick} required onChange={onChangeNick}></Input>
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" type="password" value={password} required onChange={onChangePassword}></Input>
            </div>
            <div>
            <label htmlFor="user-password-check">비밀번호 확인</label>
                <br/>
                <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordChk}></Input>
                {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다</div>}
            </div>
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니다</Checkbox>
                {termError && <div style={{color:'red'}}>약관에 동의하셔야 합니다</div>}
            </div>
            <div style={{marginTop:10}}>
                <Button type="primary" htmlType="submit">가입하기</Button>
            </div>
        </Form>
    </AppLayout>
    </>
}

export default Signup