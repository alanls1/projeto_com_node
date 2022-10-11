// carregando modulos

const http = require('http')
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const Sequelize = require('./models/category')
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

//configurações
    //session
        app.use(session({
            secret: 'cursodenode',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Midleware
        app.use((req,res,next) => {
            res.locals.success_msg = req.flash("success_msg") 
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    //Body Parser
        app.use(express.urlencoded({extended:true}))
        app.use(express.json())
    //handlebars
        app.engine("handlebars",handlebars.create({defaultLayout:'main'}).engine)
        app.set("view engine","handlebars")
        
    
    //public
        app.use(express.static(path.join(__dirname)))
        
//Rotas
    app.get('/',(req,res) => {
        res.send("Rota principal")
    })

    app.get('/posts', (req,res) => {
        res.send("Lista Posts")
    })


    app.use('/admin', admin)


//Outros
const PORT = 8081

app.listen(PORT, () => {
    console.log("Servidor Rodando!")
})