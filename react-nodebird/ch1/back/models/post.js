module.exports = (sequelize,DataTypes) => {
    const Post = sequelize.define('Post',{
        content:{
            type:DataTypes.STRING(140),
            allowNull:false,
        }
    },{
        charset:'utf8mb4', //한글에 이모티콘 가능
        collate:'utf8mb4_general_ci',
    })

    Post.associate = (db) => {
        db.Post.belongsTo(db.User)
        db.Post.hasMany(db.Image)
        db.Post.hasMany(db.Comment)
        db.Post.belongsTo(db.Post,{as:'Retweet'})
        db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'})
        db.Post.belongsToMany(db.User,{through:'Like'})
    }

    return Post
}