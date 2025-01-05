const User = require("../../models/User");
const generateToken = require("../../utils/generateToken");


exports.loginService = async (data)=>{

    if (!data.name || !data.email || !data.phoneNumber) {
        const error = new Error("Phone number, email, and name are required");
        error.statusCode = 400; // Custom status code
        throw error;
    }

    const user = await User({
        name: data.name,
        email: data.email,
        phone_number: data.phoneNumber
    });

    await user.save();

    const token = generateToken(user._id);

    return {user, token};

}