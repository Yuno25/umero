import mongoose from "mongoose";

const ListerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    city: String,
    propertyType: String,
    contact: String,
    photos: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Lister || mongoose.model("Lister", ListerSchema);
