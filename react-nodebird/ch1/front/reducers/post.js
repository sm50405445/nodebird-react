export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: '이상민',
        },
        content: '첫 번째 게시글',
        img: '',
    }], //화면에 보일 포스트들
    imagePaths: [], //미리보기 이미지 경로
    addPostErrorReason: false, //포스트 업로드 실패사유
    isAddingPost: false, //포스트 업로드 중
}

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST'
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS'
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE'

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST'
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS'
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE'

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST'
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS'
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE'

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST'
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS'
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE'

export const RETWEET_REQUEST = 'RETWEET_REQUEST'
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS'
export const RETWEET_FAILURE = 'RETWEET_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

const addPost = {
    type: ADD_POST_REQUEST,
}
const addDummy = {
    type: ADD_POST_SUCCESS,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: '이상민'
        }
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST: {
            return {
                ...state
            }
        }
        case ADD_POST_SUCCESS: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts]
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}
