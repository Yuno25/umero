import mongoose, { Schema, models } from "mongoose";

const ListerSchema = new Schema(
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

export default models.Lister || mongoose.model("Lister", ListerSchema);
