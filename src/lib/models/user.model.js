// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     clerkId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     userName: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamp: true }
// );

// const User = mongoose.models.User || mongoose.model("User", userSchema);
// export default User;

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
  { timestamps: true } // Fixed spelling
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
