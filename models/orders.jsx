import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      default: "",
    },
    surname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },

  orderId: {
    type: String,
    default: "",
  },
  valletOrderId: {
    type: String,
    default: "",
  },

  valletOrderNumber: {
    type: String,
    default: "",
  },

  amount: {
    type: Number,
    default: "",
  },

  paymentStatus: {
    type: String,
    default: "pending",
  },

  paymentType: {
    type: String,
    default: "vallet",
  },

  paymentTime: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
