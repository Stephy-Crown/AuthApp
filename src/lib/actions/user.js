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

// import { connect } from "../mongodb/mongoose";
// import User from "../models/user.model";

// // Function to create or update a user
// export const createOrUpdateUser = async (
//   id,
//   first_name,
//   last_name,
//   image_url,
//   email_addresses,
//   username
// ) => {
//   try {
//     console.log("Incoming data:", {
//       id,
//       first_name,
//       last_name,
//       image_url,
//       email_addresses,
//       username,
//     });
//     await connect();

//     const user = await User.findOneAndUpdate(
//       { clerkId: id },
//       {
//         $set: {
//           firstName: first_name,
//           lastName: last_name,
//           avatar: image_url,
//           email: email_addresses[0]?.email,
//           userName: username, // Note: changed to match your schema
//         },
//       },
//       { new: true, upsert: true }
//     );
//     console.log("User created or updated successfully:", user);
//     return user;
//   } catch (error) {
//     console.error("Error creating or updating user: ", error);
//     throw error;
//   }
// };

// // Function to delete a user by their clerkId
// export const deleteUser = async (id) => {
//   try {
//     await connect();

//     const deletedUser = await User.findOneAndDelete({ clerkId: id }); // Changed from findOneAndRemove

//     if (!deletedUser) {
//       console.log("No user found with this ID");
//       return null;
//     }

//     console.log("User successfully deleted");
//     return deletedUser;
//   } catch (error) {
//     console.error("Error deleting user: ", error);
//     throw error; // Throw the error so the calling function can handle it
//   }
// };

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
    // Detailed logging of incoming data
    console.log("Incoming data for user creation/update:", {
      id,
      first_name,
      last_name,
      image_url,
      email_addresses: JSON.stringify(email_addresses), // Explicitly stringify to see full structure
      username,
    });

    // Validate required fields
    if (!id) throw new Error("Clerk ID is required");

    // Validate email_addresses structure
    if (!email_addresses || !Array.isArray(email_addresses)) {
      console.error(
        "email_addresses is not in expected format:",
        email_addresses
      );
      throw new Error("Invalid email_addresses format");
    }

    // Extract primary email with fallback
    const primaryEmail = email_addresses[0]?.email || null;
    if (!primaryEmail) {
      console.warn("No primary email found in email_addresses array");
    }

    // Validate image_url
    if (!image_url) {
      console.warn("No image_url provided");
    }

    await connect();

    // Create the update object with null checks
    const updateData = {
      $set: {
        clerkId: id,
        firstName: first_name || null,
        lastName: last_name || null,
        avatar: image_url || null,
        email: primaryEmail,
        userName: username || null,
      },
    };

    console.log("Update data being sent to MongoDB:", updateData);

    const user = await User.findOneAndUpdate({ clerkId: id }, updateData, {
      new: true,
      upsert: true,
      runValidators: true, // Enable mongoose validation
    });

    console.log("User saved to database:", JSON.stringify(user, null, 2));
    return user;
  } catch (error) {
    console.error("Detailed error in createOrUpdateUser:", {
      message: error.message,
      stack: error.stack,
      data: {
        id,
        email_addresses,
        image_url,
      },
    });
    throw error;
  }
};

// Function to delete a user by their clerkId
export const deleteUser = async (id) => {
  try {
    await connect();

    const deletedUser = await User.findOneAndDelete({ clerkId: id });

    if (!deletedUser) {
      console.log("No user found with clerkId:", id);
      return null;
    }

    console.log(
      "Successfully deleted user:",
      JSON.stringify(deletedUser, null, 2)
    );
    return deletedUser;
  } catch (error) {
    console.error("Error in deleteUser:", {
      message: error.message,
      stack: error.stack,
      clerkId: id,
    });
    throw error;
  }
};
