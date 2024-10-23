const express=require('express')
const router=express.Router()
const regionsController=require('../controllers/regions.controller')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')
const multer  = require('multer')

router.route('/')
        .post(tokenMiddleware,allowTo('admin'),multer().none(),regionsController.createRegion)

router.route('/:city_id')
        .get(regionsController.getRegions)

router.route('/:id')
        .patch(tokenMiddleware,allowTo('admin'),multer().none(),regionsController.updateRegion)
        .delete(tokenMiddleware,allowTo('admin'),regionsController.deleteRegion)

module.exports=router