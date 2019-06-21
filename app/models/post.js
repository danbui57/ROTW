module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes. TEXT,
            allowNull: false,
            len:[1]
        }
    });

    Post.associate = function(models) {
        Post.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
}; 