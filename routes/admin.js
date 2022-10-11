const express = require('express')
const Category = require('../models/category')
const router = express.Router()
const Post = require('../models/post')


router.get('/',(req,res ) => {
    res.render('admin/index')
})

router.get('/posts',(req,res) => {
    res.send("Página de posts")
})

router.get('/categories',(req,res) => {
    Category.findAll({order: [['id' , 'DESC']]}).then((category) => {
        res.render("admin/category" , {Category: category})
    }).catch((err) => {
        req.flash("error_msg" , "Houve um erro ao Lista as Categorias")
        res.redirect("/admin")
    })
   
})


router.get('/category/add',(req,res) => {
    res.render("admin/addcategories")
})

router.post('/category/new',(req,res) => {
    let errors = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        errors.push({text: "Nome inválido"})
    }

    if(req.body.name.length < 2){
        errors.push({text: "Nome da categoria é muito pequeno"})
    }

    if(!req.body.slug || typeof req.body.slog == undefined || req.body.slug == null){
        errors.push({text: "Slug inválido"})
    }

    if(errors.length > 0){
        res.render("admin/addcategories", {errors: errors})
    }else{
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug,
        }
    
        new Category(newCategory).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categories")
            
        }).catch((err) => {
            req.flash("error_msg","Houve um erro ao salvar a categoria, Tente novamente")
            res.redirect("/admin/categories")
            
        })
        
    }

    
})

router.get("/categories/edit/:id" ,(req,res) => {
        Category.findOne({where: {'id': req.params.id}}).then((category) => {
            res.render('admin/editCategory' , {category: category})
           
        }).catch((err) => {
            req.flash("error_msg" , "Essa Categoria não existe")
            res.redirect('/admin/categories')
           
        })
        
})

router.post("/categories/edit", (req,res) => {
    Category.findOne({where: {'id': req.body.id}}).then((category) => {
        
        category.name = req.body.name
        category.slug = req.body.slug

        
        category.save().then(() => {
            req.flash("success_msg","Categoria editada com sucesso")
            res.redirect("/admin/categories")
            
        }).catch((err) => {
            req.flash("error_msg","Houve um erro interno ao salvar edição da categoria")
            res.redirect("/admin/categories")
           
        })

    }).catch((err) => {
        req.flash("error_msg","Houve um erro ao editar a categoria")
        res.redirect("/admin/categories")
        
    })
   
})

router.post("/category/delete", (req,res) => {
    Category.destroy({where: {'id': req.body.id} }).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categories")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a Categoria")
        res.redirect("/admin/categories")
    })
})

router.get("/post", (req,res) => {

    Post.findAll({order: [['id' , 'DESC']]}).then((post) =>{
        res.render("admin/post", {posts: post})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens")
        res.render("admin/post")
    })

    
})

router.get("/posts/add", (req,res) => {
    Category.findAll().then((category ) => {
        res.render("admin/addpost", {categories: category})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/admin")
    })
})

router.post("/posts/new", (req,res) => {
    let errors = []

    if(req.body.category == '0'){
        errors.push({text: "Categoria inválida registre uma categoria"})
    }

    if(errors.length > 0){
        res.render("admin/addpost", {errors: errors})
    }else{
        const newPost = {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category,
            slug: req.body.slug 
        }

        new Post(newPost).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/post")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamendo da postagem")
            res.redirect("/admin/post")
        })
    }
})

router.get("/post/edit/:id", (req,res) => {
    Post.findOne({where: {'id': req.params.id} }).then((post)=> {
        Category.findAll().then((category) => {
            res.render("admin/editpost", {category:category, post:post})
            
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias")
            res.redirect("/admin/post")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário de edição")
        res.redirect("/admin/post")
    })

})

router.post("/post/edit", (req,res) => {
    Post.findOne({where: {'id': req.body.id} }).then((posts) => {
        
        posts.title =  req.body.title
        posts.slug = req.body.slug
        posts.description = req.body.description
        posts.content = req.body.content
        posts.category = req.body.category
        
        

        posts.save().then(() => {
            
            req.flash("success_msg", "Postagm editada com sucesso!")
            res.redirect("/admin/post")
            
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/post")
            
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a edição")
        res.redirect("/admin/post")
        
    })
})

module.exports = router