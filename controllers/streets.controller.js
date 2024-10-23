const { validationResult } = require("express-validator");
let Street = require("../models/streets.model");

// get all streets
const getStreets = async (req, res) => {
    try {
        const streets = await Street.find({region_id: req.params.region_id});
        res.status(200).json({
            status: 200,
            msg: "streets retrieved successfully",
            data: streets
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// create street
const createStreet = async (req, res) => {
    try {
        const street = new Street(req.body);
        await street.save();
        res.status(200).json({status: 200, msg: "تم إنشاء الشارع بنجاح", data: street});
    } catch (error) {
        res.status(500).json(error);
    }
}

// update street
const updateStreet = async (req, res) => {
    try {
        const street = await Street.findByIdAndUpdate(req.params.id, req.body, {new: true});   
        console.log(req.body);
        res.status(200).json({status: 200, msg: "تم تحديث الشارع بنجاح", data: street});
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete street
const deleteStreet=async(req,res)=>{
    try {
        const isDeleted=await Street.findByIdAndDelete(req.params.id)
        if(isDeleted){
            res.status(200).json({status: 200,msg:"street deleted successfully"})
        }else{
            res.status(404).json({status: 404,msg:"street not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    getStreets,
    createStreet,
    updateStreet,
    deleteStreet,
}
