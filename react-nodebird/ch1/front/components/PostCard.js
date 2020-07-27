import React,{useState, useCallback,useEffect} from 'react';
import { Form, Input, Button, Card, Avatar,Comment,List } from 'antd';
import Link from 'next/link'
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST,LIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import PostImages from './PostImages'
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
  console.log('post',post)
  const [commentFormOpened,setCommentFormOpened] = useState(false)
  const [commentText,setCommentText] = useState('')
  const {me} = useSelector(state=>state.user)
  const {commentAdded,isAddingComment} = useSelector(state=>state.post)
  const dispatch = useDispatch();

  const liked = me && post.Likers && post.Likers.find(v=>v.id===me.id)

  const onToggleComment =  useCallback(() => {
    setCommentFormOpened(prev=>!prev)
    if(!commentFormOpened){
      dispatch({
        type:LOAD_COMMENTS_REQUEST,
        data:post.id
      })
    }
  },[])

  const onSubmitComment = useCallback(() => {
    if(!me){
      return alert('로그인 필요')
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data:{
        postId: post.id,
        content: commentText,
      },
    })
  },[me && me.id,commentText])

  useEffect(()=>{
    setCommentText('')
  },[commentAdded===true])

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value)
  },[])

  const onToggleLike = useCallback(() => {
    if(!me){
      return alert('로그인이 필요합니다')
    }
    if(liked){ //좋아요 누른상태
      dispatch({
        type:UNLIKE_POST_REQUEST,
        data:post.id,
      })
    }else{
      dispatch({
        type:LIKE_POST_REQUEST,
        data:post.id,
      })
    }
  },[me&&me.id&&post.id,liked])

  const onRetweet = useCallback(()=>{
    if(!me){
      return alert('로그인이 필요합니다')
    }
    return dispatch({
      type:RETWEET_REQUEST,
      data:post.id,
    })
  },[me&&me.id,post.id])

  return (
    <div>
    <Card
      key={+post.createdAt}
      cover={post.Images[0] &&<PostImages images={post.Images} />}
      actions={[
        <RetweetOutlined onClick={onRetweet}/>,
        liked?<HeartTwoTone twoToneColor="#eb2f96" onClick={onToggleLike}/>:<HeartOutlined onClick={onToggleLike}/>,
        <MessageOutlined onClick={onToggleComment}/>,
        <EllipsisOutlined />,
      ]}
      title={post.RetweetId?`${post.User.nickname}님이 리트윗하셨습니다`:null}
      extra={<Button>팔로우</Button>}
    >
     {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <Card.Meta
                avatar={(
                  <Link
                    href={{ pathname: '/user', query: { id: post.Retweet.User.id } }}
                    as={`/user/${post.Retweet.User.id}`}
                  >
                    <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />} // a tag x -> Link
              />
            </Card>
          )
          : (
            <Card.Meta
              avatar={(
                <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                  <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                </Link>
              )}
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />} // a tag x -> Link
            />
          )}
    </Card>
      {commentFormOpened && (
        <>
          <Form onFinish={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}></Input.TextArea>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
          </Form>
          <List 
            header={`${post.Comments?post.Comments.length:0}댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments||[]}
            renderItem={item=>(
              <li>
                <Comment 
                  author={item.User.nickname}
                  avatar={<Link href={{pathname:'/user' , query:{id:item.User.id}}} as={`/user/${item.User.id}`}><a>
                  <Avatar>{item.User.nickname[0]}</Avatar></a>
                  </Link>}
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }),
};

export default PostCard;
