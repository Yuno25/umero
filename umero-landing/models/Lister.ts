import mongoose from "mongoose";

const HourlyPricingSchema = new mongoose.Schema(
  {
    pricePerHour: Number,
    minHours: Number,
    openFrom: String,
    openTo: String,
  },
  { _id: false }
);

const ListerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    propertyType: {
      type: String,
      required: true,
    },

    pricingType: {
      type: String,
      enum: ["hourly", "daily", "monthly"],
      required: true,
    },

    hourlyPricing: {
      type: HourlyPricingSchema,
      default: undefined,
    },

    photos: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * 🔴 THIS LINE IS THE FIX
 * Must be DEFAULT export
 */
export default mongoose.models.Lister || mongoose.model("Lister", ListerSchema);
