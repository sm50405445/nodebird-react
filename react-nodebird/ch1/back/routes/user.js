const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')

const router = express.Router()


router.get('/',(req,res)=>{
    if(!req.user){
        return res.status(401).send('로그인이 필요합니다')
    }
    const user = Object.assign({},req.user.toJSON())
    delete user.password
    return res.json(user)
})
router.post('/',async(req,res,next)=>{
    try{
        const exUser = await db.User.findOne({
            where:{
                userId:req.body.userId,
            },
        })
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다')
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12)
        const newUser = await db.User.create({
            nickname:req.body.nickname,
            userId:req.body.userId,
            password:hashedPassword,
        })
        console.log(newUser)
        return res.json(newUser)
    }catch(err){
        console.error(err)
        return next(err)
    }
})
router.get('/:id',async(req,res,next)=>{
    try{
        const user = await db.User.findOne({
            where:{id:parseInt(req.params.id,10)},
            include:[{
                model:db.Post,
                as:'Posts',
                attributes:["id"]
            },{
                model:db.User,
                as:'Followings',
                attributes:["id"]
            },{
                model:db.User,
                as:'Followers',
                attributes:["id"]
            }],
            attributes:["id","nickname"]
        })
        const jsonUser = user.toJSON()
        jsonUser.Posts = jsonUser.Post?jsonUser.Post.length:0
        jsonUser.Followings = jsonUser.Followings?jsonUser.Followings.length:0
        jsonUser.Followers = jsonUser.Followers?jsonUser.Followers.length:0
        res.json(jsonUser)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})
router.post('/logout',(req,res)=>{
    req.logout()
    req.session.destroy()
    res.send('로그아웃 성공')
})
router.post('/login',(req,res,next)=>[
    passport.authenticate('local',(err,user,info)=>{ //done(서버에러,유저정보,로직상에러)
        if(err){
            console.error(err)
            return next(err)
        }
        if(info){
            return res.status(401).send(info.reason)
        }
        return req.login(user,async(loginError)=>{
            try{
                if(loginError){
                    return next(loginError)
                }
                const fullUser = await db.User.findOne({
                    where:{id:user.id},
                    include:[{
                        model:db.Post,
                        as:'Posts',
                        attributes:['id']
                    },{
                        model:db.User,
                        as:'Followings',
                        attributes:['id']
                    },{
                        model:db.User,
                        as:'Followers',
                        attributes:['id'],
                    }],
                    attributes:['id','nickname','userId'],
                })
                console.log(fullUser)
                return res.json(fullUser)
                // const filteredUser = Object.assign({},user.toJSON())
                // delete filteredUser.password
                // return res.json(filteredUser)
            }
            catch(err){
                next(err)
            }
        })
    })(req,res,next)
])
router.get('/:id/follow',(req,res)=>{
    
})
router.post('/:id/follow',(req,res)=>{
    
})
router.delete('/:id/follow',(req,res)=>{
    
})
router.delete('/:id/follower',(req,res)=>{
    
})
router.get('/:id/posts',async(req,res,next)=>{
    try{
        const posts = await db.Post.findAll({
            where:{
                UserId:parseInt(req.params.id,10),
                RetweetId:null,
            },
            include:[{
                model:db.User,
                attributes:['id','nickname'],
            }]
        })
        res.json(posts)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

module.exports = router