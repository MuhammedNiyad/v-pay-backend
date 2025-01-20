const moment = require("moment");
const User = require("../../models/User");

exports.saveUserDetails = async (userId, data) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 400;
      throw error;
    }

    if (!validateEmail(data.email)) {
      const error = new Error("Invalid email");
      error.statusCode = 400;
      throw error;
    }

    if (!validateDateOfBirth(data.dateOfBirth).isValid) {
      const error = new Error(validateDateOfBirth(data.dateOfBirth).message);
      error.statusCode = 400;
      throw error;
    }

    if (!validateGender(data.gender)) {
      const error = new Error("Invalid gender");
      error.statusCode = 400;
      throw error;
    }

    if (!validatePanNumber(data.panNumber)) {
      const error = new Error("Invalid pan number");
      error.statusCode = 400;
      throw error;
    }

    user.first_name = data.firstName;
    user.last_name = data.lastName;
    user.email = data.email;
    user.date_of_birth = data.dateOfBirth;
    user.gender = data.gender;
    user.pan_number = data.panNumber;

    await user.save();

    return { success: true, data: user };
  } catch (error) {
    console.error("============", error);
    throw error;
  }
};

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateDateOfBirth(dob) {
  const isValidFormat = moment(dob, "DD/MM/YYYY", true).isValid();
  if (!isValidFormat) {
    return { isValid: false, message: "Invalid format. Use DD/MM/YYYY." };
  }

  const dobDate = moment(dob, "DD/MM/YYYY");
  const today = moment();
  const age = today.diff(dobDate, "years");

  if (dobDate.isAfter(today)) {
    return {
      isValid: false,
      message: "Date of birth cannot be in the future.",
    };
  }

  if (age > 120) {
    return { isValid: false, message: "Age cannot be greater than 120 years." };
  }

  return { isValid: true, message: "Valid date of birth." };
}

function validateGender(gender) {
  const validGenders = ["male", "female", "other"];
  return validGenders.includes(gender);
}

function validatePanNumber(pan) {
  // Regular expression for PAN format
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
}
