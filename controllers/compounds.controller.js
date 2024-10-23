const { validationResult } = require("express-validator");
let Compound = require("../models/compounds.model");
// get all compounds
const getCompounds = async (req, res) => {
    try {
        const compounds = await Compound.find({city_id: req.params.city_id});
        res.status(200).json({
            status: 200,
            msg: "compounds retrieved successfully",
            data: compounds
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// create compound
const createCompound = async (req, res) => {
    try {
        const duplicateUrl = await Compound.findOne({url: req.body.url});
        if (duplicateUrl) {
            return res.status(422).json({
                status: 'fail',
                error: ['هناك كومباوند آخر بهذا الرابط']
            });
        }

        const compound = new Compound(req.body);
        await compound.save();
        res.status(200).json({status: 200, msg: "تم إنشاء الكومباوند بنجاح", data: compound});
    } catch (error) {
        res.status(500).json(error);
    }
}

// update compound
const updateCompound = async (req, res) => {
    try {
        const compound = await Compound.findByIdAndUpdate(req.params.id, req.body, {new: true});   
        console.log(req.body);
        res.status(200).json({status: 200, msg: "تم تحديث الكومباوند بنجاح", data: compound});
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete compound
const deleteCompound=async(req,res)=>{
    try {
        const isDeleted=await Compound.findByIdAndDelete(req.params.id)
        if(isDeleted){
            res.status(200).json({status: 200,msg:"compound deleted successfully"})
        }else{
            res.status(404).json({status: 404,msg:"compound not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    getCompounds,
    createCompound,
    updateCompound,
    deleteCompound,
}
