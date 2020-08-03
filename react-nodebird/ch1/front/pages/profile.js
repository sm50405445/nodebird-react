import React,{useEffect,useCallback,useState} from 'react';
import { Form, Input, Button, List, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import NickEditForm from '../components/NickEditForm';
import {useDispatch,useSelector} from 'react-redux'
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_FAILURE } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Profile = () => {
  const dispatch = useDispatch(state=>state.user)
  const {me,followingList,followerList} = useSelector(state=>state.user)
  const {mainPosts} = useSelector(state=>state.post)
  const [editedName,setEditedName] = useState('')

  const onUnfollow = useCallback(userId=>()=>{
    dispatch({
      type:UNFOLLOW_USER_REQUEST,
      data:userId,
    })
  },[])

  const onRemoveFollwer = useCallback(userId=>()=>{
    dispatch({
      type:REMOVE_FOLLOWER_FAILURE,
      data:userId,
    })
  },[])

  return (
    <div>
      <NickEditForm />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더보기</Button>}
        bordered
        dataSource={followingList}
        renderItem={(item) => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card actions={[<StopOutlined onClick={onUnfollow(item.id)} />]}>
              <Card.Meta description={item.nickname}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더보기</Button>}
        bordered
        dataSource={followerList}
        renderItem={(item) => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card actions={[<StopOutlined onClick={onRemoveFollwer(item.id)} />]}>
              <Card.Meta description={item.nickname}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
      <div>
        {mainPosts.map(c=>(
          <PostCard key={+c.createdAt} post={c} />
        ))

        }
      </div>
    </div>

  );
};

Profile.getInitialProps = async(context) => {
  const state = context.store.getState()
  //  이 직전에 LOAD_USERS_REQUEST success 후 밑에 실행
  context.store.dispatch({
    type:LOAD_FOLLOWERS_REQUEST,
    data:state.user.me && state.user.me.id
  })
  context.store.dispatch({
    type:LOAD_FOLLOWINGS_REQUEST,
    data:state.user.me && state.user.me.id
  })
  context.store.dispatch({
    type:LOAD_USER_POSTS_REQUEST,
    data:state.user.me && state.user.me.id
  })

  //하지만 이쯤에서 LOAD_USERS_SUCCESS 돼서 me가 생김
}

export default Profile;
