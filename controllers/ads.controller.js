const Ad=require('../models/ads.model')
const Governorate = require('../models/governorates.model')
const Cities=require('../models/cities.model')
const Regions=require('../models/regions.model')
const Streets=require('../models/streets.model')
const Property=require('../models/properties.model')
const Compound = require('../models/compounds.model')
// get all ads
const getAllAds= async (req, res) => {
    const ads=await Ad.find().populate('property')
    res.status(200).json({status:200,msg:"ads fetched successfully",data:ads})
}

// create ad
const createAd=async(req,res)=>{
    const ad=await Ad.create(req.body)
    res.status(201).json({status:201,msg:"ad created successfully",data:ad})
}

// get ads by user
const getAdsByUser = async (req, res) => {
    try {
        const ads = await Ad.find()
            .populate({
                path: 'property',
                match: { user_id: req.currentUser.id }
            })
            .exec();

        // const userAds = ads.filter(ad => ad.property !== null);

        res.status(200).json({
            status: 200,
            msg: "تم جلب الإعلانات بنجsاح",
            data: ads
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: "حدث خطأ أثناء جلب الإعلانات",
            error: error.message
        });
    }
}

// get ad by slug
const getAdBySlug = async (req, res) => {
    const ad = await Ad.findOne({ slug: req.params.slug }).populate('property');
    res.status(200).json({ status: 200, msg: "تم جلب الإعلان بنجاح", data: ad });
}

// delete ad by id  
const deleteAdById = async (req, res) => {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 200, msg: "تم حذف الإعلان بنجاح", data: ad });
}

const getAdsInGov = async (req, res) => {
    try {
      // ابحث عن المحافظة بناءً على الرابط المرسل في الباراميتر
      const gov = await Governorate.findOne({ url: req.params.gov_url });

      // إذا لم يتم العثور على المحافظة
      if (!gov) {
        return res
          .status(404)
          .json({ status: 404, msg: "المحافظة غير موجودة" });
      }

      // جلب المدن التابعة للمحافظة
      const cities = await Cities.find({ governorate_id: gov._id });

      // ابحث عن الإعلانات
      const ads = await Ad.find().populate("property_id"); // جلب كل الإعلانات

      // فلترة الإعلانات بناءً على اسم المحافظة في العقار المرتبط
      const filteredAds = [];
      for (let ad of ads) {
        const property = await Property.findById(ad.property_id); // جلب العقار المرتبط بالإعلان
        if (property && property.governorate === gov.name) {
          filteredAds.push(ad); // إذا تطابق اسم المحافظة، أضف الإعلان إلى القائمة
        }
      }

      // ارجع الإعلانات إذا تم العثور عليها
      res.status(200).json({
        status: 200,
        msg: "تم جلب الإعلانات في المحافظة بنجاح",
        data: {
          name: gov.name,
          english_name: gov.english_name,
          meta_title: gov.meta_title,
          meta_description: gov.meta_description,
          h1_title: gov.h1_title,
          url: gov.url,
          id: gov.id,
          image:gov.image,
          Ads: filteredAds,
          cities,
        },
      });
    } catch (error) {
      // في حالة حدوث خطأ
      res
        .status(500)
        .json({
          status: 500,
          msg: "حدث خطأ أثناء جلب الإعلانات",
          error: error.message,
        });
    }
  };
  
  
const getAdsInCity = async (req, res) => {
    try {
      const city = await Cities.findOne({ url: req.params.city_url });
      if (!city) {
        return res.status(404).json({ status: 404, msg: "المدينة غير موجودة" });
      }

      const compounds = await Compound.find({ city_id: city._id });

      const ads = await Ad.find().populate('property_id'); 

      const filteredAds = [];
      for (let ad of ads) {
        const property = await Property.findById(ad.property_id); 
        if (property && property.city === city.name) {
          filteredAds.push(ad);
        }
      }
  
      res.status(200).json({ 
        status: 200, 
        msg: "تم جلب الإعلانات في المدينة بنجاح", 
        data: {  name: city.name,
          english_name: city.english_name,
          meta_title: city.meta_title,
          meta_description: city.meta_description,
          h1_title: city.h1_title,
          url: city.url,
          image:city.image,
          id: city.id, Ads: filteredAds, compounds } 
      });
    } catch (error) {
      // في حالة حدوث خطأ
      res.status(500).json({ status: 500, msg: "حدث خطأ أثناء جلب الإعلانات", error: error.message });
    }
  };
  
  
const getAdsInCompound = async (req, res) => {
    try {
      const compound = await Compound.findOne({ url: req.params.compound_url });
      if (!compound) {
        return res.status(404).json({ status: 404, msg: "الكومباوند غير موجودة" });
      }

      const ads = await Ad.find().populate('property_id'); 

      const filteredAds = [];
      for (let ad of ads) {
        const property = await Property.findById(ad.property_id); 
        if (property && property.compound_name === compound.name) {
          filteredAds.push(ad);
        }
      }
  
      res.status(200).json({ 
        status: 200, 
        msg: "تم جلب الإعلانات في الكومباوند بنجاح", 
        data: {  
          name: compound.name,
          english_name: compound.english_name,
          meta_title: compound.meta_title,
          meta_description: compound.meta_description,
          h1_title: compound.h1_title,
          url: compound.url,
          id: compound.id,
          image:compound.image
          , Ads: filteredAds } 
      });
    } catch (error) {
      // في حالة حدوث خطأ
      res.status(500).json({ status: 500, msg: "حدث خطأ أثناء جلب الإعلانات", error: error.message });
    }
  };
  
// Search in ads
  const getAdsBySearch = async (req, res) => {
    try {
      const {
        bathrooms,
        city,
        governorate,
        maxArea,
        maxPrice,
        minArea,
        minPrice,
        region,
        rooms,
        selectedOption, // for 'rent' or 'buy'
        sortBy,
        street,
        subCategory,
      } = req.query;
      // Build the query object dynamically
      let query = {};
  
      if (Array.isArray(bathrooms) && bathrooms.length > 0) {
        query.bathrooms = { $in: bathrooms.map(Number) }; // Convert to numbers
      }
      if (Array.isArray(rooms) && rooms.length > 0) {
        query.rooms = { $in: rooms.map(Number) }; // Convert to numbers
      }
      if (Array.isArray(city) && city.length > 0) query.city = { $in: city };
      if (Array.isArray(governorate) && governorate.length > 0) query.governorate = { $in: governorate };
      if (minArea || maxArea) query.area = { $gte: Number(minArea), $lte: Number(maxArea) };
      if (minPrice || maxPrice) query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
      if (Array.isArray(region) && region.length > 0) query.region = { $in: region };
      if (selectedOption) query.type = selectedOption;
      if (Array.isArray(street) && street.length > 0) query.street = { $in: street };
      if (subCategory) query.sub_category = subCategory;
  
      // Sorting logic
      let sort = {};
      if (sortBy === 'الاقل سعر') {
        sort.price = 1; // Sort by lowest price
      } else if (sortBy === 'الاعلى سعر') {
        sort.price = -1; // Sort by highest price
      }
      else{
          sort.created_at = -1;
      }
  
      // Fetch matching properties from the database
    const properties = await Property.find(query).sort(sort);

    // Extract the property _ids from the returned properties
    const propertyIds = properties.map(property => property._id);

    // Now, fetch the ads where property_id matches one of the property _ids
    const ads = await Ad.find({ property_id: { $in: propertyIds } }).populate('property_id');
    // Sort the ads based on the order of propertyIds
    const sortedAdsF = propertyIds.map((propertyId) => ads.find((ad) => ad.property_id.equals(propertyId)));
    const sortedAds = sortedAdsF.filter((ad) => ad);

  console.log(sortedAds)
    res.json({
      ads:sortedAds
    });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const getAllLocations = async (req, res) => {
    try {

      let governorates = await Governorate.find({}, { name: 1 });
      let cities = await Cities.find({}, { name: 1 });
      let regions = await Regions.find({}, { name: 1 });
      let streets = await Streets.find({}, { name: 1 });
  
      
      const governoratesWithType = governorates.map((gov) => ({
        ...gov.toObject(),
        type: 'governorate',
      }));
      const citiesWithType = cities.map((city) => ({
        ...city.toObject(),
        type: 'city',
      }));
      const regionsWithType = regions.map((region) => ({
        ...region.toObject(),
        type: 'region',
      }));
      const streetsWithType = streets.map((street) => ({
        ...street.toObject(),
        type: 'street',
      }));
      res.json({data:[...governoratesWithType,...citiesWithType, ...regionsWithType,...streetsWithType]});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
module.exports={getAllAds,createAd,getAdsByUser,getAdBySlug,deleteAdById ,getAdsInGov ,getAdsInCity,getAdsInCompound,getAdsBySearch,getAllLocations}    


