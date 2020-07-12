const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')

const passportConfig = require('./passport')
const db = require('./models')
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/post')
const postsAPIRouter = require('./routes/posts')
const hashtagAPIRouter = require('./routes/hashtag')

dotenv.config()
const app = express()
db.sequelize.sync() // 테이블 생성해줌
passportConfig()

app.use(morgan('dev'))
app.use(express.json()) // json형식 본문 처리
app.use(express.urlencoded({extended:true})) //form 넘어온 데이터 처리
app.use(cors({
    origin:true, //요청 주소랑 같게
    credentials:true, //cors, axios에서도 둘다 해줘야함
}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
    resave:true,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true, //자바스크립트로 쿠키 빼오기 못함
        secure:false, //httsp쓸때 true
    },
    name:'balpoom'
}))
app.use(passport.initialize())
app.use(passport.session()) //express session보다 뒤에 session 사용하기때문

app.use('/api/user',userAPIRouter)
app.use('/api/post',postAPIRouter)
app.use('/api/posts',postsAPIRouter)
app.use('/api/hashtag',hashtagAPIRouter)

app.listen(3065,()=>{
    console.log('server is running on localhost:3065')
})