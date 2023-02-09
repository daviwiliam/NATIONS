const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nations', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado')
}catch(err){
    console.log('Erro: '+err)
}

module.exports = sequelize