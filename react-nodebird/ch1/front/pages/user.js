import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch,useSelector} from 'react-redux'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'
import PostCard from '../components/PostCard'

const User = () => {
    
    const {mainPosts} =  useSelector(state => state.post)
    const {userInfo} = useSelector(state=>state.user)

    return(
        <div>
       {userInfo
        ?<Card
            actions={[
                <div key="twit">
                짹짹 <br />
                {userInfo.Posts}
                </div>,
                <div key="following">
                팔로잉 <br />
                {userInfo.Followings}
                </div>,
                <div key="follower">
                팔로워 <br />
                {userInfo.Followers}
                </div>
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                title={userInfo.nickname}
            />
        </Card>
        :null}
            {mainPosts.map(c=>(
                <PostCard key={+c.createdAt} post={c} />
            ))}
        </div>
    )
}

User.propTypes = {
    id:PropTypes.number.isRequired,
}

//getInitialProps componentdidmount보다 먼저 실행됨 가장 최초의 작업 가능
User.getInitialProps = async(context) => { //context Component 됨
    console.log('user getinitialProps',context.query.id)
    const id = parseInt(context.query.id)
    context.store.dispatch({
        type:LOAD_USER_REQUEST,
        data:id,
    })
    context.store.dispatch({
        type:LOAD_USER_POSTS_REQUEST,
        data:id,
    })
    return{
        id //서버에서 받아서 User에 Prop까지 전달
    }
}

export default User