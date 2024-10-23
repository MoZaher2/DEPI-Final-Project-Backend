const { validationResult } = require("express-validator");
let Governorate = require("../models/governorates.model");
// get all governorates for Home page
const getGovernorates = async (req, res) => {
    try {
        const governorates = await Governorate.find(null,{"name":1,"url":1});
        res.status(200).json({
            status: 200,
            msg: "governorates retrieved successfully",
            data: governorates
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all governorates with token
const getGovernoratesWithToken = async (req, res) => {
    try {
        const governorates = await Governorate.find();
        res.status(200).json({
            status: 200,
            msg: "governorates retrieved successfully",
            data: governorates
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// create governorate
const createGovernorate = async (req, res) => {
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
        const errorMessages = validationErr.array().map((error) => error.msg);
        return res.status(400).json({ status: 'fail', error: errorMessages });
    }

    try {
        const duplicateUrl = await Governorate.findOne({url: req.body.url});
        if (duplicateUrl) {
            return res.status(422).json({
                status: 'fail',
                error: ['هناك محافظة آخرى بهذا الرابط']
            });
        }

        const governorate = new Governorate(req.body);
        await governorate.save();
        res.status(200).json({status: 200, msg: "تم إنشاء المحافظة بنجاح", data: governorate});
    } catch (error) {
        res.status(500).json(error);
    }
}

// update governorate
const updateGovernorate = async (req, res) => {
    try {
        const governorate = await Governorate.findByIdAndUpdate(req.params.id, req.body, {new: true});   
        console.log(req.body);
        res.status(200).json({status: 200, msg: "تم تحديث المحافظة بنجاح", data: governorate});
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete governorate
const deleteGovernorate=async(req,res)=>{
    try {
        const isDeleted=await Governorate.findByIdAndDelete(req.params.id)
        if(isDeleted){
            res.status(200).json({status: 200,msg:"governorate deleted successfully"})
        }else{
            res.status(404).json({status: 404,msg:"governorate not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    getGovernorates,
    getGovernoratesWithToken,
    createGovernorate,
    updateGovernorate,
    deleteGovernorate,
}
