const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cities",
    required: true,
  },
},{timestamps: true});

regionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

regionSchema.set('toJSON', {
  virtuals: true
}); 

const Region   = mongoose.model("Regions", regionSchema);

module.exports = Region;
