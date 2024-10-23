const express=require('express')
const propertiesController=require('../controllers/properties.controller')
const uploadPropertyImagesMiddleware=require('../middlewares/uploadPropertyImages.middleware')
const router=express.Router()

router.route('/')
        .get(propertiesController.getAllProperties)
        .post(uploadPropertyImagesMiddleware, propertiesController.createProperty);

module.exports = router;