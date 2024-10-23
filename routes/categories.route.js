const express=require('express')
const router=express.Router()
const categoriesController=require('../controllers/categories.controller')
const categoriesMiddleware=require('../middlewares/categories.middleware')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')

router.route('/')
        .get(categoriesController.getCategories)
        .post(tokenMiddleware,allowTo('admin','user'),categoriesMiddleware.middlewareBody,categoriesController.createCategory)
router.route('/:id')
        .put(tokenMiddleware,allowTo('admin','user'),categoriesMiddleware.middlewareBody,categoriesController.updateCategory)
        .delete(tokenMiddleware,allowTo('admin','user'),categoriesController.deleteCategory)

module.exports=router