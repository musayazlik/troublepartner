import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  piecesNumber: {
    type: Number,
    required: true,
    default: 0,
  },

  usedNumber: {
    type: Number,
    required: true,
    default: 0,
  },

  discount: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
