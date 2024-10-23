const Property=require('../models/properties.model')

// get all properties
const getAllProperties= async (req, res) => {
    const properties=await Property.find()
    res.status(200).json({status:200,msg:"properties fetched successfully",data:properties})
}

// create property
const createProperty=async(req,res)=>{
    const arrayFields = ['facilities', 'features', 'services', 'devices', 'accessories'];
    arrayFields.forEach(field => {
        if (req.body[field]) {
            if (typeof req.body[field] === 'string') {
                req.body[field] = req.body[field].split(',').map(item => item.trim());
            }
        } else {
            req.body[field] = [];
        }
    });

    const property = new Property(req.body);
    await property.save();
    res.status(201).json({status: 201, msg: "property created successfully", data: property});
}

module.exports={getAllProperties,createProperty}    