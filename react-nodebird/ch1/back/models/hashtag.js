module.exports = (sequelize,DataTypes) => {
    const Hashtag = sequelize.define('Hashtag',{
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,
        }
    },{
        charset:'utf8mb4', //한글에 이모티콘 가능
        collate:'utf8mb4_general_ci',
    })

    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'})
    }

    return Hashtag
}