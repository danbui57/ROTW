module.exports = function(sequelize, dataTypes) {

    const Vote = sequelize.define('vote', {
        vote: {
            type: dataTypes.INTEGER,
            defaultValue:1
        },
        voterId: {
            type: dataTypes.STRING,
            // defaultValue:
        }
    })

    Vote.associate = function(models) {
        Vote.belongsTo(models.post, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Vote;
}
