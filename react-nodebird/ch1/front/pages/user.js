import React from 'react'
import PropTypes from 'prop-types'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'

const User = ({id}) => {
    const dispatch = useDispatch()
    const {mainPosts} =  useSelector(state => state.post)

    useEffect(()=>{
        dispatch({
            type:LOAD_USER_REQUEST,
            data:id,
        })
        dispatch({
            type:LOAD_USER_POSTS_REQUEST,
            data:id,
        })

    },[])
    return(
        <div>
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
    return{
        id:parseInt(context.query.id,10) //서버에서 받아서 User에 Prop까지 전달
    }
}

export default User