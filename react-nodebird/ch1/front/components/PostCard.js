import React,{useState, useCallback,useEffect} from 'react';
import { Form, Input, Button, Card, Avatar,Comment,List } from 'antd';
import Link from 'next/link'
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const [commentFormOpened,setCommentFormOpened] = useState(false)
  const [commentText,setCommentText] = useState('')
  const {me} = useSelector(state=>state.user)
  const {commentAdded,isAddingComment} = useSelector(state=>state.post)
  const dispatch = useDispatch();

  const onToggleComment =  useCallback(() => {
    setCommentFormOpened(prev=>!prev)
  },[])

  const onSubmitComment = useCallback(() => {
    if(!me){
      return alert('로그인 필요')
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data:{
        postId: post.id,
      }
    })
  },[me && me.id])

  useEffect(()=>{
    setCommentText('')
  },[commentAdded===true])

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value)
  },[])

  return (
    <div>
    <Card
      key={+post.createdAt}
      cover={post.img && <img alt="example" src={post.img} />}
      actions={[
        <RetweetOutlined />,
        <HeartOutlined />,
        <MessageOutlined onClick={onToggleComment}/>,
        <EllipsisOutlined />,
      ]}
      extra={<Button>팔로우</Button>}
    >
      <Card.Meta
        avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        title={post.User.nickname}
        description={(
        <div>
          {post.content.split(/(#[^\s]+)/g).map((v)=>{
          if(v.match(/#[^\s]+/)){
            return(
              <Link href={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
            )
          }
          return v;
        })}
        </div>)} //a tag(x) -> Link
      />
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
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
