import mongoose from "mongoose";

const RenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    rentalDuration: { type: String, required: true },
    peopleCount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Renter || mongoose.model("Renter", RenterSchema);
