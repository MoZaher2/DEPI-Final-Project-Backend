const express=require('express')
const router=express.Router()
const governoratesController=require('../controllers/governorates.controller')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')
const governoratesMiddleware=require('../middlewares/governorates.middleware')
const uploadImageForLocationMiddleware=require('../middlewares/uploadImageForLocation.middleware')

router.route('/')
        .get(governoratesController.getGovernorates)
        .post(tokenMiddleware,allowTo('admin'),uploadImageForLocationMiddleware,governoratesMiddleware.middlewareBody,governoratesController.createGovernorate)

router.route('/authGov')
        .get(tokenMiddleware,allowTo('admin','user'),governoratesController.getGovernoratesWithToken)



router.route('/:id')
        .patch(tokenMiddleware,allowTo('admin'),uploadImageForLocationMiddleware,governoratesController.updateGovernorate)
        .delete(tokenMiddleware,allowTo('admin'),governoratesController.deleteGovernorate)

module.exports=router