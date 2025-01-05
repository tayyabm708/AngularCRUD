import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Invalid email format"], // Regex for basic email validation
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
    },
    address: {
      type: String,
      default: "Not provided",
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const User = mongoose.model("User", userSchema);

export default User;
