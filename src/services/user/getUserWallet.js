const Wallet = require("../../models/Wallet");

exports.getUserWalletService = async (userId) => {
    try {
        
        const wallet = await Wallet.findOne({user_id: userId});
        return wallet;

    } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
    }
};