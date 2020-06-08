import React,{useState, useCallback} from 'react';
import { Form, Input, Button, Card, Avatar,Comment } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import { List } from 'antd/lib/form/Form';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const [commentFormOpened,setCommentFormOpened] = useState(false)
  const [commentText,setCommentText] = useState('')
  const {me} = useSelector(state=>state.user)
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
    })
  },[])

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
        description={post.content}
      />
    </Card>
      {commentFormOpened && (
        <>
          <Form onFinish={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}></Input.TextArea>
            </Form.Item>
            <Button type="primary" htmlType="submit">삐약</Button>
          </Form>
          <List 
            header={`${post.Comments?post.Comments.length:0}댓글`}
            itemLayout="horizontal"
            dataSource={post.Comment||[]}
            renderItem={Item=>(
              <li>
                <Comment 
                  author={item.User.nickname}
                  avatar={<Avatar>${item.User.nickname[0]}</Avatar>}
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
