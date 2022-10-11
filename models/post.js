const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemadecadastro','root','123456',{
    host: 'localhost',
    dialect: 'mysql',
    query: {raw: true}
})

const Post = sequelize.define('post',{
    title: {
        type: Sequelize.STRING,
        required: true
    },
    slug: {
        type: Sequelize.STRING,
        required: true
    },
    description: {
        type: Sequelize.STRING,
        required: true
    },
    content: {
        type: Sequelize.STRING,
        required: true
    },
    category: {
        type: Sequelize.STRING,
        foreignKey: 'Categoryname',
        required: true
    }
})

//Post.sync({force: true})
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch ((error) => {
  console.error('Unable to connect to the database:', error);
})



module.exports = Post