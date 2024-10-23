const { validationResult } = require("express-validator");
let Region = require("../models/regions.model");

// get all regions
const getRegions = async (req, res) => {
    try {
        const regions = await Region.find({city_id: req.params.city_id});
        res.status(200).json({
            status: 200,
            msg: "regions retrieved successfully",
            data: regions
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// create region
const createRegion = async (req, res) => {
    try {
        const region = new Region(req.body);
        await region.save();
        res.status(200).json({status: 200, msg: "تم إنشاء المنطقة بنجاح", data: region});
    } catch (error) {
        res.status(500).json(error);
    }
}

// update region
const updateRegion = async (req, res) => {
    try {
        const region = await Region.findByIdAndUpdate(req.params.id, req.body, {new: true});   
        console.log(req.body);
        res.status(200).json({status: 200, msg: "تم تحديث المنطقة بنجاح", data: region});
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete region
const deleteRegion=async(req,res)=>{
    try {
        const isDeleted=await Region.findByIdAndDelete(req.params.id)
        if(isDeleted){
            res.status(200).json({status: 200,msg:"region deleted successfully"})
        }else{
            res.status(404).json({status: 404,msg:"region not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    getRegions,
    createRegion,
    updateRegion,
    deleteRegion,
}
