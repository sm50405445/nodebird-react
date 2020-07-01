const passport = require('passport')
const db =require('../models')
const local = require('./local')

module.exports = () => {
    
    passport.serializeUser((user,done)=>{
        return done(null,user.id)
    })

    passport.deserializeUser(async(id,done)=>{
        try{
            const user = await db.User.findOne({
                where:{id},
            })
            return done(null,user)
        }
        catch(err){
            console.error(err)
            return done(err)
        }
    })

    local()
}

//프론트에서는 서버로 cookie만 전달
//서버가 cookieparser,expresssession으로 쿠키 검사 후 id:3 발견
//id:3 deserializeUser에 들어감
//req.user로 사용자 정보 들어감
//요청 보낼때마다 deserializeUser