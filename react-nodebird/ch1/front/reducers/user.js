const dummyUser = {
    nickname:'이상민',
    Post:[],
    Followings:[],
    Followers:[],
    SignupData:{},
}

export const initialState = {
    isLoggedIn:false,
    user:null,
}

export const SIGN_UP = 'SIGN_UP'
export const LOG_IN = 'LOG_IN' //액션 이름
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILED = 'LOG_IN_FAILED'

export const signUpAction = (data) => {
    return{
        type:SIGN_UP,
        data:data    
    }
}
export const loginAction = {
    type:LOG_IN,
    data:{
        nickname:'이상민'
    }
}
export const logoutAction = {
    type:LOG_OUT,
}

export default (state=initialState,action) =>{
    switch(action.type){
        case LOG_IN:{
            return{
                ...state,
                isLoggedIn:true,
                user:dummyUser,
            }
        }
        case LOG_OUT:{
            return{
                ...state,
                isLoggedIn:false,
                user:null
            }
        }
        case SIGN_UP:{
            return{
                ...state,
                SignupData: action.data,
            }
        }
        default:{
            return {
                ...state,
            }
        }  
    }
}

