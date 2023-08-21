const { Schema, Types, model } = require("mongoose");
const JobScheme = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlenght: 20,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlenght: 30,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = model('Job', JobScheme)
