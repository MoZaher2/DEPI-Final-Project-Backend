const express=require('express')
const router=express.Router()
const streetsController=require('../controllers/streets.controller')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')
const multer  = require('multer')

router.route('/')
        .post(tokenMiddleware,allowTo('admin'),multer().none(),streetsController.createStreet)

router.route('/:region_id')
        .get(streetsController.getStreets)

router.route('/:id')
        .patch(tokenMiddleware,allowTo('admin'),multer().none(),streetsController.updateStreet)
        .delete(tokenMiddleware,allowTo('admin'),streetsController.deleteStreet)

module.exports=router