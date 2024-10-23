const mongoose = require("mongoose");

const compoundSchema = new mongoose.Schema({
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
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cities",
    required: true,
  },
},{timestamps: true});
  
compoundSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

compoundSchema.set('toJSON', {
  virtuals: true
});

const Compound   = mongoose.model("Compounds", compoundSchema);

module.exports = Compound;
