const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    whats_phone: {type:String,default:""},
    bio: {type:String,default:""},
    image: String,
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    user_type: {type:String,default:""},
    token: String,
  },
  { timestamps: true }
);


const Users = mongoose.model("Users", userSchema);
module.exports = Users;
