const mongoose = require("mongoose");

const streetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  region_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Regions",
    required: true,
  },
},{timestamps: true});

streetSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

streetSchema.set('toJSON', {
  virtuals: true
}); 

const Street = mongoose.model("Streets", streetSchema);

module.exports = Street;
