const express=require('express')
const router=express.Router()
const mallsController=require('../controllers/malls.controller')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')
const multer  = require('multer')

router.route('/')
        .post(tokenMiddleware,allowTo('admin'),multer().none(),mallsController.createMall)

router.route('/:city_id')
        .get(mallsController.getMalls)

router.route('/:id')
        .patch(tokenMiddleware,allowTo('admin'),multer().none(),mallsController.updateMall)
        .delete(tokenMiddleware,allowTo('admin'),mallsController.deleteMall)

module.exports=router