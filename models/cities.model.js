const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  english_name: String,
  meta_title: String,
  meta_description: String,
  h1_title: String,
  url: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  governorate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Governorates",
    required: true,
  },
},{timestamps: true});
  
citySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

citySchema.set('toJSON', {
  virtuals: true
});

const City   = mongoose.model("Cities", citySchema);

module.exports = City;
