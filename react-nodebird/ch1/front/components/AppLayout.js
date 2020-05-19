import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {Menu,Input, Button,Row,Col,Card,Avatar,Form} from 'antd'
import LoginForm from './LoginForm'
import UserProfile from '../components/UserProfile'
import { useSelector } from 'react-redux'

const AppLayout = ({children}) => {
    const {isLoggedIn} = useSelector(state=>state.user)
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign:'middle'}}/>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn 
                    ? <UserProfile />
                    :
                    <LoginForm />
                    }
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </Col>
                <Col xs={24} md={12}>
                {children}{/*props임 */}
                </Col>
            </Row>
            
        </div>
    )
}

AppLayout.propTypes = {
    children : PropTypes.node
}

export default AppLayout;