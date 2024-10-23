const { validationResult } = require("express-validator");
let Category = require("../models/categories.model");

// get all categories
const getCategories=async(req,res)=>{
    try {
        const categories=await Category.find()
        res.status(200).json({status: 200,msg:"category restored successfully",data:categories})
    } catch (error) {
        res.status(500).json(error)
    }
} 

// create category
const createCategory=async(req,res)=>{
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const errorMessages = err.array().map((error) => error.msg);
      return res.status(400).json({
        status: "fail",
        error: errorMessages,
      });
    }
    try {
        const category=new Category(req.body)
        await category.save()
        res.status(200).json({status: 200,msg:"category created successfully",data:category})
    } catch (error) {
        res.status(500).json(error)
    }
}

// update category
const updateCategory=async(req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    try {
        const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({status: 200,msg:"category updated successfully",data:category})
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete category
const deleteCategory=async(req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({status: 200,msg:"category deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}