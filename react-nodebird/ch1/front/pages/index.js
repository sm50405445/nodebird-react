import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
// import {connect} from 'react-redux'
import { loginRequestAction, logoutRequestAction } from '../reducers/user';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

// const Home = ({user,dispatch,login,logout}) => {
const Home = () => {
  // const dispatch = useDispatch()
  // const user = useSelector(state=>state.user.user) //전체 state 즉 setState
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch({
      type:LOAD_MAIN_POSTS_REQUEST
    })
  }, []);

  // useEffect(() => {
  //     // login()
  //     // logout()
  //     // login()
  //     dispatch(loginAction)
  //     dispatch(logoutAction)
  //     dispatch(loginAction)
  // }, []); //dep아무것도 없으면 componentDidMount
  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map((c, i) => {
        return <PostCard post={c} key={i} />;
      })}
    </div>
  );
};

// function mapStateToProps(state){
//     return{
//         user:state.user,
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         login: ()=>dispatch(loginAction),
//         logout: ()=>dispatch(logoutAction)
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Home);

Home.getInitialProps = async(context) => {
  console.log(Object.keys(context))
  context.store.dispatch({
    type:LOAD_MAIN_POSTS_REQUEST,
  })
}

export default Home;
