import mongoose from "mongoose";

const RenterSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    city: String,
    rentalDuration: String,
    peopleCount: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Renter || mongoose.model("Renter", RenterSchema);
