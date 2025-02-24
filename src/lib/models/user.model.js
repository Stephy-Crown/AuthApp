import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

// // models/user.model.js
// import { Schema, model, models } from "mongoose";

// const UserSchema = new Schema({
//   clerkId: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   userName: { type: String, required: true },
//   email: { type: String },    // Make sure this exists
//   avatar: { type: String },   // Make sure this exists
// }, {
//   timestamps: true,
// });

// const User = models.User || model("User", UserSchema);

// export default User;
