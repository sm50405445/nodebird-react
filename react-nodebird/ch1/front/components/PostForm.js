import React, { useCallback,useState,useEffect,useRef } from 'react';
import { Form, Input, Button, Card, Avatar } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { ADD_POST_REQUEST,UPLOAD_IMAGES_REQUEST,REMOVE_IMAGE } from '../reducers/post';


const PostForm = () => {
  const dispatch = useDispatch();
  const [text,setText] = useState('');
  const { imagePaths,isAddingPost,postAdded } = useSelector((state) => state.post);
  const imageInput = useRef()

  useEffect(()=>{
    setText('')
  },[postAdded===true])

  const onSubmitForm = useCallback(()=>{
    if(!text || !text.trim()){
      alert('게시글을 작성해주세요')
    }
    console.log('text',text)
    const formData = new FormData()
    imagePaths.forEach((i)=>{
      formData.append('image',i)
      formData.append('content',text)
    })
    dispatch({
      type:ADD_POST_REQUEST,
      data:formData,
    })
  },[text,imagePaths]) //useCallback 쓸때는 안에 state 쓸때는 그 state 넣어줘야함

  const onChangeText = useCallback((e)=>{
    console.log(e.target.value)
    setText(e.target.value)
  },[])

  const onChangeImages = useCallback((e)=>{
    const imageFormData = new FormData()
    const data = []
    data.forEach.call(e.target.files,(f)=>{
      imageFormData.append('image',f)
    })
    dispatch({
      type:UPLOAD_IMAGES_REQUEST,
      data:imageFormData,
    })
  },[])

  const onRemoveImage = useCallback(index=>()=>{ //함수에 괄호 들어있으면 다음과같이 () 추가
    dispatch({
      type:REMOVE_IMAGE,
      index,
    })
  },[])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  },[imageInput.current])
  return (
    <Form style={{ margin: '10px 0 10px' }} encType="multipart/form-data" onFinish={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
        value={text}
        onChange={onChangeText}
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img
                src={`http://localhost:3065/${v}`}
                style={{ width: '200px' }}
                alt={v}
              />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
