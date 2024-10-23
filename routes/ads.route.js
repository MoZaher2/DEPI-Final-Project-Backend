const express=require('express')
const adsController=require('../controllers/ads.controller')
const router=express.Router()
const multer  = require('multer')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware') 

router.route('/')
        .get(tokenMiddleware,allowTo('admin'),adsController.getAllAds)
        .post(tokenMiddleware,allowTo('admin','user'),multer().none(), adsController.createAd);

router.route('/gov/:gov_url')
        .get(adsController.getAdsInGov)
router.route('/city/:city_url')
        .get(adsController.getAdsInCity)
router.route('/compound/:compound_url')
        .get(adsController.getAdsInCompound)

router.route('/search')
        .get(adsController.getAdsBySearch)

router.route('/all-locations')
        .get(adsController.getAllLocations)

        router.route('/user')
        .get(tokenMiddleware,allowTo('admin','user'),adsController.getAdsByUser)
router.route('/:slug')
        .get(adsController.getAdBySlug)
router.route('/:id')
        .delete(tokenMiddleware,allowTo('admin','user'),adsController.deleteAdById)



module.exports = router;