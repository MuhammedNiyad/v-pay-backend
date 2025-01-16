const PointHistory = require("../../models/PointHistory");

exports.getUserPointHistoryService = async (userId) => {
    try {
        
        const pointHistory = await PointHistory.find({
            user_id: userId,
        });

        return pointHistory;

    } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
    }
};