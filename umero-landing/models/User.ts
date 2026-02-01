import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // BASIC AUTH
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function (this: any) {
        // Password is REQUIRED ONLY AFTER signup completes
        return this.emailVerified === true;
      },
    },

    // EMAIL VERIFICATION STATE
    emailVerified: {
      type: Boolean,
      default: false,
    },

    // OTP (used for signup + login)
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    // AUTH CONTEXT
    lastAuthAction: {
      type: String,
      enum: ["signup", "login"],
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

//SAFE EXPORT
export default mongoose.models.User || mongoose.model("User", UserSchema);
