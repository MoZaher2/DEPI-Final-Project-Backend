const mongoose = require("mongoose");

const mallSchema = new mongoose.Schema({
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


mallSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

mallSchema.set('toJSON', {
  virtuals: true
});


const Mall   = mongoose.model("Malls", mallSchema);

module.exports = Mall;
