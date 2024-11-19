// // import { connect } from "../mongodb/mongoose"; // Ensure this file connects to your MongoDB
// // import User from "../models/user.model"; // Correctly import your User model

// // // Function to create or update a user
// // export const createOrUpdateUser = async (
// //   id,
// //   first_name,
// //   last_name,
// //   image_url,
// //   email_addresses,
// //   username
// // ) => {
// //   try {
// //     // Establish a connection to the database
// //     await connect();

// //     // Use findOneAndUpdate to either update or create a new user document
// //     const user = await User.findOneAndUpdate(
// //       { clerkId: id },
// //       {
// //         $set: {
// //           firstName: first_name,
// //           lastName: last_name,
// //           avatar: image_url,
// //           email: email_addresses[0]?.email, // Use optional chaining to safely access email
// //           username: username,
// //         },
// //       },
// //       { new: true, upsert: true } // Return the updated document and create one if not found
// //     );
// //     console.log("User created or updated successfully:", user); // Add detailed log
// //     return user;
// //   } catch (error) {
// //     console.error("Error creating or updating user: ", error);
// //     throw error;
// //   }
// // };

// // // Function to delete a user by their clerkId
// // export const deleteUser = async (id) => {
// //   try {
// //     // Establish a connection to the database
// //     await connect();

// //     // Use findOneAndDelete to remove the user document
// //     await User.findOneAndRemove({ clerkId: id });
// //     console.log("User successfully deleted");
// //   } catch (error) {
// //     console.error("Error deleting user: ", error);
// //   }
// // };

import { connect } from "../mongodb/mongoose";
import User from "../models/user.model";

// Function to create or update a user
export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    console.log("Incoming data:", {
      id,
      first_name,
      last_name,
      image_url,
      email_addresses,
      username,
    });
    await connect();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email_addresses[0]?.email,
          userName: username, // Note: changed to match your schema
        },
      },
      { new: true, upsert: true }
    );
    console.log("User created or updated successfully:", user);
    return user;
  } catch (error) {
    console.error("Error creating or updating user: ", error);
    throw error;
  }
};

// Function to delete a user by their clerkId
export const deleteUser = async (id) => {
  try {
    await connect();

    const deletedUser = await User.findOneAndDelete({ clerkId: id }); // Changed from findOneAndRemove

    if (!deletedUser) {
      console.log("No user found with this ID");
      return null;
    }

    console.log("User successfully deleted");
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error; // Throw the error so the calling function can handle it
  }
};
