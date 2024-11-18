// import mongoose from "mongoose";

// let initialized = false;
// export const connect = async () => {
//   mongoose.set("strictQuery", true);

//   if (initialized) {
//     console.log(" MongoDB already connected");
//     return;
//   }
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "AuthApp",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(" MongoDB connected");
//     initialized = true;
//   } catch (e) {
//     console.log(" MongoDB connection error: " + e.message);
//   }
// };

// mongodb/mongoose.js
import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connect = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "AuthApp", // replace with your database name
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
