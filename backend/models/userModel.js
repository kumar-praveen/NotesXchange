import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: Number,
      default: null,
    },
    verificationCodeExpiry: {
      type: Date,
      default: () => Date.now() + 10 * 60 * 1000,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
