const mongoose = require("mongoose");

const governorateSchema = new mongoose.Schema({
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
},{timestamps: true});

governorateSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

governorateSchema.set('toJSON', {
  virtuals: true
});


const Governorate = mongoose.model("Governorates", governorateSchema);

module.exports = Governorate;
