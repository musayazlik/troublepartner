import mongoose from "mongoose";

const complainantSchema = new mongoose.Schema({
  elementId: {
    type: String,
    required: true,
  },
  elementType: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Complainant ||
  mongoose.model("Complainant", complainantSchema);
