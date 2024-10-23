const express=require('express')
const router=express.Router()
const citiesController=require('../controllers/cities.controller')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')
const uploadImageForLocationMiddleware=require('../middlewares/uploadImageForLocation.middleware')

router.route('/')
        .post(tokenMiddleware,allowTo('admin'),uploadImageForLocationMiddleware,citiesController.createCity)
router.route('/:governorate_id')
        .get(citiesController.getCities)
router.route('/:id')
        .patch(tokenMiddleware,allowTo('admin'),uploadImageForLocationMiddleware,citiesController.updateCity)
        .delete(tokenMiddleware,allowTo('admin'),citiesController.deleteCity)

module.exports=router