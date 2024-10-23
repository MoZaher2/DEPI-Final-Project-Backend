const { validationResult } = require("express-validator");
let Article = require("../models/articles.model");
let Category = require("../models/categories.model");
// get all articles
const getArticles = async (req, res) => {
    try {
        const page=req.query.page
        const limit = 10;
        const skip = (page - 1) * limit;
        const articles = await Article.find({finished: true}).sort({createdAt: -1}).limit(limit).skip(skip);
        
        const totalCount = await Article.countDocuments({});
        const totalPages = Math.ceil(totalCount / limit);
        
        res.status(200).json({
            status: 200,
            msg: "articles retrieved successfully",
            data: {posts:articles,total_pages:totalPages}
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// create article
const createArticle = async (req, res) => {
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
        const errorMessages = validationErr.array().map((error) => error.msg);
        return res.status(400).json({ status: 'fail', error: errorMessages });
    }

    try {
        const duplicateUrl = await Article.findOne({article_url: req.body.article_url});
        if (duplicateUrl) {
            return res.status(400).json({
                status: 'fail',
                error: ['هناك مقال آخر بهذا الرابط']
            });
        }
        
        // Convert tags from string to array of strings if it's a string
        if (req.body.tags && typeof req.body.tags === 'string') {
            req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
        } else if (!Array.isArray(req.body.tags)) {
            req.body.tags = [];
        }
        const article = new Article(req.body);
        await article.save();
        res.status(200).json({status: 200, msg: "تم إنشاء المقال بنجاح", data: article});
    } catch (error) {
        res.status(500).json(error);
    }
}


// update article
const updateArticle = async (req, res) => {
    try {
        // Convert tags from string to array of strings if it's a string
        if (req.body.tags && typeof req.body.tags === 'string') {
            req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
        } else if (!Array.isArray(req.body.tags)) {
            req.body.tags = [];
        }
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});    
        res.status(200).json({status: 200, msg: "تم تحديث المقال بنجاح", data: article});
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete article
const deleteArticle=async(req,res)=>{
    try {
        const isDeleted=await Article.findByIdAndDelete(req.params.id)
        if(isDeleted){
            res.status(200).json({status: 200,msg:"article deleted successfully"})
        }else{
            res.status(404).json({status: 404,msg:"article not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get article by url
const getArticleByUrl = async (req, res) => {
    try {
        const article = await Article.findOne({article_url: req.params.article_url}).populate('category_id')
        if(!article){
            return res.status(404).json({status: 404, msg: "article not found"});
        }
        const related_posts = await Article.find({category_id: article.toObject().category_id,finished: true}).sort({createdAt: -1}).limit(6)
        res.status(200).json({status: 200, msg: "article retrieved successfully", data: article,related_posts:related_posts});
    } catch (error) {
        res.status(500).json(error);
    }
}


// get articles by category
const getArticlesByCategory = async (req, res) => {
    try {
        const page=req.query.page
        const limit = 10;
        const skip = (page - 1) * limit;
        const category = await Category.findOne({category_name: req.params.category_name});
        if(!category){
            return res.status(404).json({status: 404, msg: "Category not found"});
        }
        const articles = await Article.find({category_id: category._id,finished: true}).sort({createdAt: -1}).limit(limit).skip(skip);
        const totalCount = await Article.countDocuments({category_id: category._id,finished: true});
        const totalPages = Math.ceil(totalCount / limit);
        if (articles.length === 0) {
            return res.status(404).json({status: 404, msg: "No articles found for this category"});
        }
        res.status(200).json({status: 200, msg: "Articles retrieved successfully", data: articles,total_pages:totalPages});
    } catch (error) {
        res.status(500).json({status: 500, msg: "An error occurred", error: error.message});
    }
}

// get articles by tag
const getArticlesByTag = async (req, res) => {
    try {
        const page=req.query.page
        const limit = 10;
        const skip = (page - 1) * limit;
        const articles = await Article.find({tags: req.params.tag,finished: true}).sort({createdAt: -1}).limit(limit).skip(skip);
        const totalCount = await Article.countDocuments({tags: req.params.tag,finished: true});
        const totalPages = Math.ceil(totalCount / limit);
        if (articles.length === 0) {
            return res.status(404).json({status: 404, msg: "No articles found for this tag"});
        }
        res.status(200).json({status: 200, msg: "Articles retrieved successfully", data: articles,total_pages:totalPages});
    } catch (error) {
        res.status(500).json({status: 500, msg: "An error occurred", error: error.message});
    }
}

//get latest 10 articles
const getLatestArticles = async (req, res) => {
    try {
        const articles = await Article.find({finished: true}).sort({createdAt: -1}).limit(10);
        res.status(200).json({status: 200, msg: "Latest articles retrieved successfully", data: articles});
    } catch (error) {
        res.status(500).json({status: 500, msg: "An error occurred", error: error.message});
    }
}

//get all articles without pagination
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({finished: true}).sort({createdAt: -1});
        res.status(200).json({status: 200, msg: "All articles retrieved successfully", data: articles});
    } catch (error) {
        res.status(500).json({status: 500, msg: "An error occurred", error: error.message});
    }
}
//get all drafts without pagination
const getAllDrafts = async (req, res) => {
    try {
        const articles = await Article.find({finished: false}).sort({createdAt: -1});
        res.status(200).json({status: 200, msg: "All drafts retrieved successfully", data: articles});
    } catch (error) {
        res.status(500).json({status: 500, msg: "An error occurred", error: error.message});
    }
}

//get all tags
const getAllTags = async (req, res) => {
    try {
        const tags = await Article.distinct('tags');
        res.status(200).json({status: 200, msg: "All tags retrieved successfully", data: tags});
    } catch (error) {
        res.status(500).json({status: 500, msg: "An error occurred", error: error.message});
    }
}

//upload image for article
const uploadImage=async(req,res)=>{
    if(req.body.article_image){
        res.status(200).json({data:req.body.article_image})
    }
    else{
        res.status(500).json({status: 500, msg: "An error occurred"});
    }
}

module.exports={
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleByUrl,
    getArticlesByCategory,
    getArticlesByTag,
    getLatestArticles,
    getAllArticles,
    getAllDrafts,
    getAllTags,
    uploadImage
}
