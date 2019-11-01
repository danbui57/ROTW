module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("post", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
            len:[1]
            }
        }
    });

    Post.associate = function(models) {
        Post.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
        Post.hasMany(models.vote, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Post;
}; 