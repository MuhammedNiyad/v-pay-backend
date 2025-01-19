const Transactions = require("../../models/Transactions");

exports.getUserTransactionService = async (userId) => {
  try {
    const transactions = await Transactions.find({
      user_id: userId,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    return transactions;
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
};
