module.exports = function(sequelize, dataTypes) {
 
    const User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
 
        firstname: {
            type: dataTypes.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: dataTypes.STRING,
            notEmpty: true
        },
 
        username: {
            type: dataTypes.TEXT
        },
 
        email: {
            type: dataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
 
        last_login: {
            type: dataTypes.DATE
        },
 
        status: {
            type: dataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });

    User.associate = function(models) {
        User.hasMany(models.post, {
            onDelete: "cascade"
        });
    };
 
    return User;
 
};