import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    photo: String,

    role: {
      type: String,
      enum: ["Tenant", "Owner", "Admin"],
      default: "Tenant",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);