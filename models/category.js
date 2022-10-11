
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemadecadastro','root','123456',{
    host: 'localhost',
    dialect: 'mysql',
    query: {raw:true}
})

const Category = sequelize.define('category',{
    name: {
        type: Sequelize.STRING,
        required: true
    },
    slug: {
        type: Sequelize.STRING,
        required: true
    }
})





    
   

module.exports = Category