import { connect } from "../mongodb/mongoose"; // Ensure this file connects to your MongoDB

// Example User model schema import
import { User } from "../models/user.model"; // Ensure you import your User model correctly

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
    // Establish a connection to the database
    await connect();

    // Use findOneAndUpdate to either update or create a new user document
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email_addresses[0].email, // Ensure email_addresses array is well-formed
          username: username,
        },
      },
      { new: true, upsert: true } // Return the updated document and create one if not found
    );

    return user;
  } catch (error) {
    console.error("Error creating or updating user: ", error);
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
};

// Function to delete a user by their clerkId
export const deleteUser = async (id) => {
  try {
    // Establish a connection to the database
    await connect();

    // Use findOneAndDelete to remove the user document
    await User.findOneAndDelete({ clerkId: id });
    console.log("User successfully deleted");
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
};
