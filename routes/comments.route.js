const express=require('express')
const router=express.Router()
const commentsController=require('../controllers/comments.controller')
const tokenMiddleware=require('../middlewares/token.middleware')
const allowTo=require('../middlewares/role.middleware')
const multer  = require('multer')

router.route('/ad')
        .post(tokenMiddleware,allowTo('admin','user'),multer().none(),commentsController.addCommentToAd)
router.route('/article')
        .post(tokenMiddleware,allowTo('admin','user'),multer().none(),commentsController.addCommentToArticle)
router.route('/ad/:ad_slug')
        .get(commentsController.getCommentsByAdSlug)
router.route('/article/:article_id')
        .get(commentsController.getCommentsByArticleId)
router.route('/:comment_id')
        .delete(tokenMiddleware,allowTo('admin','user'),commentsController.deleteCommentById)
router.route('/ads')
        .get(commentsController.getCommentsForAds)
router.route('/articles')        
        .get(commentsController.getCommentsForArticles)

module.exports=router   