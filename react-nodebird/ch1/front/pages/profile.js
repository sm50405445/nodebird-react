import React from 'react'
import {Form, Input, Button,List, Card} from 'antd'
import {StopOutlined} from '@ant-design/icons'
import NickEditForm from '../components/NickEditForm'

const Profile = () => {
    return(
    <div>
        <NickEditForm />
        <List
            style={{marginBottom:'20px'}}
            grid={{gutter:4,xs:2,md:3}}
            size="small"
            header={<div>팔로워 목록</div>}
            loadMore={<Button style={{width:'100%'}}>더보기</Button>}
            bordered
            dataSource={['이상민','프로그래머','노드오피셜']}
            renderItem={item=>(
                <List.Item style={{marginTop:'20px'}}>
                    <Card actions={[<StopOutlined />]}><Card.Meta description={item}></Card.Meta></Card>
                </List.Item>
            )}
        ></List>
        <List
            style={{marginBottom:'20px'}}
            grid={{gutter:4,xs:2,md:3}}
            size="small"
            header={<div>팔로잉 목록</div>}
            loadMore={<Button style={{width:'100%'}}>더보기</Button>}
            bordered
            dataSource={['제로초','바보','노드버드오피셜']}
            renderItem={item=>(
                <List.Item style={{marginTop:'20px'}}>
                    <Card actions={[<StopOutlined />]}><Card.Meta description={item}></Card.Meta></Card>
                </List.Item>
            )}
        ></List>
    </div>
    ) 
 
}

export default Profile