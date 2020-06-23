module.exports = (sequelize,DataTypes) => {
    const Image = sequelize.define('Image',{
        src:{
            type:DataTypes.STRING(200),
            allowNull:false,
        }
    },{
        charset:'utf8', //한글에 이모티콘 가능
        collate:'utf8_general_ci',
    })

    Image.associate = (db) => {
        db.Image.belongsTo(db.Post)
    }

    return Image
}