const { validationResult } = require("express-validator");
let Mall = require("../models/malls.model");

// get all malls
const getMalls = async (req, res) => {
    try {
        const malls = await Mall.find({city_id: req.params.city_id});
        res.status(200).json({
            status: 200,
            msg: "malls retrieved successfully",
            data: malls
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// create mall
const createMall = async (req, res) => {
    try {
        const mall = new Mall(req.body);
        await mall.save();
        res.status(200).json({status: 200, msg: "تم إنشاء المول بنجاح", data: mall});
    } catch (error) {
        res.status(500).json(error);
    }
}

// update mall
const updateMall = async (req, res) => {
    try {
        const mall = await Mall.findByIdAndUpdate(req.params.id, req.body, {new: true});   
        console.log(req.body);
        res.status(200).json({status: 200, msg: "تم تحديث المول بنجاح", data: mall});
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete mall
const deleteMall=async(req,res)=>{
    try {
        const isDeleted=await Mall.findByIdAndDelete(req.params.id)
        if(isDeleted){
            res.status(200).json({status: 200,msg:"mall deleted successfully"})
        }else{
            res.status(404).json({status: 404,msg:"mall not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    getMalls,
    createMall,
    updateMall,
    deleteMall,
}
