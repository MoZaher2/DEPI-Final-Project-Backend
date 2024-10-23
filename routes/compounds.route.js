const express=require('express')
const router=express.Router()
const compoundsController=require('../controllers/compounds.controller')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')
const uploadImageForLocationMiddleware=require('../middlewares/uploadImageForLocation.middleware')

router.route('/')
        .post(tokenMiddleware,allowTo('admin'),uploadImageForLocationMiddleware,compoundsController.createCompound)
router.route('/:city_id')
        .get(compoundsController.getCompounds)
router.route('/:id')
        .patch(tokenMiddleware,allowTo('admin'),uploadImageForLocationMiddleware,compoundsController.updateCompound)
        .delete(tokenMiddleware,allowTo('admin'),compoundsController.deleteCompound)

module.exports=router