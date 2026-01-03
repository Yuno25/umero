import mongoose, { Schema, models } from "mongoose";

const RenterSchema = new Schema(
  {
    name: String,
    email: String,
    city: String,
    rentalDuration: String,
    peopleCount: Number,
  },
  { timestamps: true }
);

export default models.Renter || mongoose.model("Renter", RenterSchema);
