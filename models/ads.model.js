const mongoose = require('mongoose');
const City=require('./cities.model')
const Compound=require('./compounds.model')
const adSchema = new mongoose.Schema({
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Properties' },
    phone: { type: String, default: null },
    whats_phone: { type: String, default: null },
    email: { type: String, default: null },
    ad_type: { type: Number, default: 0 },
    advertiser_type: { type: String, default: null },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    slug: { type: String, unique: true },
}, { timestamps: true });


adSchema.pre('save', async function(next) {
    if (!this.slug) {
        const property = await mongoose.model('Properties').findById(this.property_id);
        if (property) {
            let city = await City.findOne({ name: property.city });
            city = city?.url || city?.name || property.city;

            let compound = '';
            if (property.compound_name) {
                const compoundDoc = await Compound.findOne({ name: property.compound_name }).select('url');
                compound = compoundDoc?.url ? `${compoundDoc.url}-` : '';
            }

            const categories = {
                'شقق': 'apartment',
                'قصور': 'villa',
                'مصايف': 'chalet',
                'منازل': 'house',
                'مبانى': 'building',
                'أراضي': 'land',
                'تجارية': 'commercial',
                'مقابر': 'cemetery'
            };

            const category = categories[property.category] || property.category;
            const propertyType = property.type === 'rent' ? 'for-rent' : 'for-sale';

            if (this.ad_type == 1) {
                this.slug = `property-${propertyType}-in-${city.toLowerCase().replace(/\s+/g, '-')}-${this._id.toString().slice(-2)}`;
            } else {
                this.slug = `${category}-${propertyType}-in-${compound}${city.toLowerCase().replace(/\s+/g, '-')}-${this._id.toString().slice(-2)}`;
            }
        } else {
            this.slug = this.email.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
    }
    next();
});

adSchema.virtual('property', {
    ref: 'Properties',
    localField: 'property_id',
    foreignField: '_id',
    justOne: true
});


adSchema.methods.addToFavorites = function(userId) {
    if (!this.favorites.includes(userId)) {
        this.favorites.push(userId);
    }
    return this.save();
};

adSchema.methods.removeFromFavorites = function(userId) {
    this.favorites = this.favorites.filter(id => id.toString() !== userId.toString());
    return this.save();
};

// لإضافة route للتبديل بين إضافة الإعلان للمفضلة وحذفه منها، يمكنك إضافة الكود التالي في ملف الـ routes الخاص بك:
// 
// const express = require('express');
// const router = express.Router();
// const Ad = require('../models/ad.model');
// 
// // التبديل بين إضافة وحذف الإعلان من المفضلة
// router.post('/ads/:adId/toggle-favorite', async (req, res) => {
//     try {
//         const ad = await Ad.findById(req.params.adId);
//         if (!ad) {
//             return res.status(404).json({ message: 'الإعلان غير موجود' });
//         }
//         
//         const userId = req.user._id;
//         const isFavorite = ad.favorites.includes(userId);
//         
//         if (isFavorite) {
//             await ad.removeFromFavorites(userId);
//             res.status(200).json({ message: 'تم حذف الإعلان من المفضلة بنجاح', isFavorite: false });
//         } else {
//             await ad.addToFavorites(userId);
//             res.status(200).json({ message: 'تمت إضافة الإعلان إلى المفضلة بنجاح', isFavorite: true });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'حدث خطأ أثناء تحديث حالة المفضلة', error: error.message });
//     }
// });
// 
// module.exports = router;

adSchema.set('toJSON', { virtuals: true });
adSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Ads', adSchema);
