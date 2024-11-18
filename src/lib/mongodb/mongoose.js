import mongoose from "mongoose";

let initialized = false;
export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (initialized) {
    console.log(" MongoDB already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "AuthApp",
      userNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB already connected");
    initialized = true;
  } catch (e) {
    console.log(" MongoDB connection error: " + e.message);
  }
};
