const express = require('express')
const db = require('../models')
const multer = require('multer')
const path = require('path')
const comment = require('../models/comment')
const { isLoggedIn } = require('./middleware')
const router = express.Router()

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads')
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname)
            const basename = path.basename(file.originalname,ext)
            cb(null,basename+new Date().valueOf()+ext)
        }
    }),
    limits:{fileSize:20*1024*1024},
})

router.post('/',isLoggedIn,upload.none(),async(req,res,next)=>{
    try{
        console.log('body',req.body)
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
        if(req.body.image){ //이미지 주소 여러개 올리면 배열로 옴 image:[]
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((image)=>{
                    return db.Image.create({src:image})
                }))
                await newPost.addImages(images)
            }else{ //이미지 하나만 올리면 image:주소
                const image = await db.Image.create({src:req.body.image})
                await newPost.addImage(image)
            }
        }
        const fullPost = await db.Post.findOne({
            where:{id:newPost.id},
            include:[{
                model:db.User
            },{
                model:db.Image,
            }, {
                model: db.User,
                as: 'Likers',
                attributes: ['id'],
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

// router.post('/images',upload.fields([{name:'image'}]),(req,res)=>{
    
// })

router.post('/images',upload.array('image'),(req,res)=>{
    res.json(req.files.map(v=>v.filename)) 
})

router.get('/:id', async (req, res, next) => {
    try {
      const post = await db.Post.findOne({
        where: { id: req.params.id },
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }],
      });
      res.json(post);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

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

router.post('/:id/comment',isLoggedIn,async(req,res,next)=>{
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

router.post(`/:id/like`,isLoggedIn,async(req,res,next)=>{
    try{
        const post = await db.Post.findOne({where:{id:req.params.id}})
        if(!post){
            return res.status(404).send('포스트 존재 x')
        }
        await post.addLiker(req.user.id)
        res.json({userId:req.user.id})
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

router.delete(`/:id/like`,isLoggedIn,async(req,res,next)=>{
    try{
        const post = await db.Post.findOne({where:{id:req.params.id}})
        if(!post){
            return res.status(404).send('포스트 존재 x')
        }
        await post.removeLiker(req.user.id)
        res.json({userId:req.user.id})
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/:id/retweet',isLoggedIn,async(req,res,next)=>{
    try{
        const post = await db.Post.findOne({
            where:{id:req.params.id},
            include:[{
                model:db.Post,
                as:'Retweet',
            }],
        })
        if(!post){
            return res.status(404).send('포스트 존재 x')
        }
        if(req.user.id===post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다')
        }
        const retweetTargetId = post.RetweetId || post.id
        const exPost = await db.Post.findOne({
            where:{
                UserId:req.user.id,
                RetweetId:retweetTargetId,
            }
        })
        if(exPost){
            return res.status(403).send('이미 리트윗 했습니다')
        }
        const retweet = await db.Post.create({
            UserId:req.user.id,
            RetweetId:retweetTargetId,
            content:'retweet',
        })
        const retweetWithPrevPost = await db.Post.findOne({
            where:{id:retweet.id},
            include:[{
                model:db.User,
                attributes:['id','nickname'],
            },{
                model:db.Post,
                as:'Retweet',
                include:[{
                    model:db.User,
                    attributes:['id','nickname'],
                },{
                    model:db.Image,
                }]
            }]
        })
        res.json(retweetWithPrevPost)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

module.exports = router