const Comment = require('../models/comments.model');
const Ad = require('../models/ads.model');

// add comment to ad by ad_slug
const addCommentToAd = async (req, res) => {
    try {
        const { ad_slug, comment } = req.body;
        const ad = await Ad.findOne({ slug: ad_slug });
        const ad_id=ad.toObject()._id
        const newComment = new Comment({ad_id,comment,user_id:req.currentUser.id,user_role:req.currentUser.role});
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

// add comment to article
const addCommentToArticle = async (req, res) => {
    try {
        const { article_id, comment } = req.body;
        const newComment = new Comment({ article_id, comment, user_id:req.currentUser.id, user_role:req.currentUser.role });
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

//delete comment by id
const deleteCommentById=async(req,res)=>{
    try {
        const { comment_id } = req.params;
        const comment=await Comment.findById(comment_id)
        if(comment.user_id.toString()!==req.currentUser.id.toString() && req.currentUser.role!=='admin'){
            return res.status(403).json({ message: 'You are not allowed to delete this comment' });
        }
        await Comment.findByIdAndDelete(comment_id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error: error.message });
    }
}

//get comments by ad slug
const getCommentsByAdSlug=async(req,res)=>{
    try {
        const { ad_slug } = req.params;
        const ad=await Ad.findOne({ slug: ad_slug });
        const ad_id=ad.toObject()._id
        const comments=await Comment.find({ad_id}).populate('user_id')
        res.status(200).json({ data:comments });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get comments', error: error.message });
    }
}

//get comments by article id
const getCommentsByArticleId=async(req,res)=>{
    try {
        const { article_id } = req.params;
        const comments=await Comment.find({article_id}).populate('user_id')
        res.status(200).json({ data:comments });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get comments', error: error.message });
    }
}

//get Comments for Ads
const getCommentsForAds=async(req,res)=>{
    try {
        const comments=await Comment.find({ ad_id: { $ne: null } }).populate('user_id').populate('ad_id')
        res.status(200).json({ data:comments });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get comments', error: error.message });
    }
}

//get Comments for Articles
const getCommentsForArticles=async(req,res)=>{
    try {
        const comments=await Comment.find({ article_id: { $ne: null } }).populate('user_id').populate('article_id')
        res.status(200).json({ data:comments });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get comments', error: error.message });
    }
}

module.exports = {
    addCommentToAd,
    addCommentToArticle,
    deleteCommentById,
    getCommentsByAdSlug,
    getCommentsByArticleId,
    getCommentsForAds,
    getCommentsForArticles   
};
