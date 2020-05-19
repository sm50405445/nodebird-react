import React,{useEffect} from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {useDispatch,useSelector} from 'react-redux'
// import {connect} from 'react-redux'
import {loginAction,logoutAction} from '../reducers/user'


// const Home = ({user,dispatch,login,logout}) => {
const Home = () => {
    // const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user) //전체 state 즉 setState
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
    const {mainPosts} = useSelector(state=>state.post)

    // useEffect(() => {
    //     // login()
    //     // logout()
    //     // login()
    //     dispatch(loginAction)
    //     dispatch(logoutAction)
    //     dispatch(loginAction)
    // }, []); //dep아무것도 없으면 componentDidMount
    return(
        <div>
            {user ? <div>로그인 했습니다: {user.nickname}</div>:<div>로그아웃 했습니다.</div>}
            {isLoggedIn && <PostForm/>}
            {mainPosts.map((c,i)=>{
                return(
                    <PostCard post={c} key={i} />
                )
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
export default Home;