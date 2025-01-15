const User = require("../../models/User");

exports.saveUserDetails = async (userId,data) => {
  try {
    
    const user = await User.findById(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = 400; 
        throw error;
    }

    user.first_name = data.firstName,
    user.last_name = data.lastName,
    user.email = data.email,
    user.date_of_birth = data.dateOfBirth,
    user.gender = data.gender,
    user.pan_number = data.panNumber;

    await user.save();

    return {success: true, data: user};

  } catch (error) {
    const err = new Error("Internal server error");
    err.statusCode = 500;
    throw err;
  }
};
