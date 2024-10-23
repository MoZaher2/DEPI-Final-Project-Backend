const { validationResult } = require("express-validator");
let City = require("../models/cities.model");
// get all cities
const getCities = async (req, res) => {
    try {
        const cities = await City.find({governorate_id: req.params.governorate_id});
        res.status(200).json({
            status: 200,
            msg: "cities retrieved successfully",
            data: cities
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// create city
const createCity = async (req, res) => {
    try {
        const duplicateUrl = await City.findOne({url: req.body.url});
        if (duplicateUrl) {
            return res.status(422).json({
                status: 'fail',
                error: ['هناك مدينة آخرى بهذا الرابط']
            });
        }

        const city = new City(req.body);
        await city.save();
        res.status(200).json({status: 200, msg: "تم إنشاء المدينة بنجاح", data: city});
    } catch (error) {
        res.status(500).json(error);
    }
}

// update city
const updateCity = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, {new: true});   
        console.log(req.body);
        res.status(200).json({status: 200, msg: "تم تحديث المدينة بنجاح", data: city});
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete city
const deleteCity=async(req,res)=>{
    try {
        const isDeleted=await City.findByIdAndDelete(req.params.id)
        if(isDeleted){
            res.status(200).json({status: 200,msg:"city deleted successfully"})
        }else{
            res.status(404).json({status: 404,msg:"city not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    getCities,
    createCity,
    updateCity,
    deleteCity,
}
