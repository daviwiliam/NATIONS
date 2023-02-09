const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const Nation = db.define('Nation', {
    country: {
        type: DataTypes.STRING,
        require: true
    },
    continent: {
        type: DataTypes.STRING,
        require: true
    },
    url: {
        type: DataTypes.STRING,
        require: true
    }
})

module.exports = Nation