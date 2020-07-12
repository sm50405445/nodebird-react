import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch,useSelector} from 'react-redux'
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post'
import PostCard from '../components/PostCard'
import { Card, Avatar } from 'antd'

const Hashtag = ({tag}) => {
    const dispatch = useDispatch()
    const {mainPosts,userInfo} =  useSelector(state => state.post)

    useEffect(()=>{
        dispatch({
            type:LOAD_HASHTAG_POSTS_REQUEST,
            data:tag,
        })

    },[])
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

Hashtag.propTypes = {
    tag:PropTypes.string.isRequired,
}

//getInitialProps componentdidmount보다 먼저 실행됨 가장 최초의 작업 가능
Hashtag.getInitialProps = async(context) => { //context Component 됨
    console.log('hashtag getinitialProps',context.query.tag)
    return{
        tag:context.query.tag
    }
}

export default Hashtag