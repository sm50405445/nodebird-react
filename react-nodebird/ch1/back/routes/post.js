const express = require('express')
const db = require('../models')
const comment = require('../models/comment')
const router = express.Router()

router.post('/',async(req,res,next)=>{
    try{
        const hashtags = req.body.content.match(/#[^\s]+/g)
        const newPost = await db.Post.create({
            content:req.body.content,
            UserId:req.user.id,
        })
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag=>db.Hashtag.findOrCreate({
                where:{name:tag.slice(1).toLowerCase()},
            })))
            await newPost.addHashtags(result.map(r=>r[0]))
        }
        const fullPost = await db.Post.findOne({
            where:{id:newPost.id},
            include:[{
                model:db.User
            }],
        })
        console.log('fullPost',fullPost)
        res.json(fullPost)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/images',(req,res)=>{

})

router.get("/:id/comments",async(req,res,next)=>{
    try{
        const post = await db.Post.findOne({where:{id:req.params.id}})
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다')
        }
        const comments = await db.Post.findAll({
            where:{
                PostId:req.params.id,
            },
            order:[['createdAt','ASC']],
            include:[{
                model:db.User,
                attributes:['id','nickname'],
            }]
        })
        return res.json(comments)
    } 
    catch(err){
        console.error(err)
    }
})

router.post('/:id/comment',async(req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).send('로그인이 필요합니다')
        }
        const post = await db.Post.findOne({where:{id:req.params.id}})
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다')
        }
        const newCommments = await db.Comment.create({
            PostId:post.id,
            UserId:req.user.id,
            content:req.body.content,
        })
        await post.addComment(newCommments.id)
        const comment = await db.Comment.findOne({
            where:{
                id:newCommments.id,
            },
            include:[{
                model:db.User,
                attributes:["id","nickname"]
            }]
        })
        return res.json(comment)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

module.exports = router