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
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(" MongoDB connected");
    initialized = true;
  } catch (e) {
    console.log(" MongoDB connection error: " + e.message);
  }
};
