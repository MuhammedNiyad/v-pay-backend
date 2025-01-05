const asyncHandler = require("../../middlewares/asyncHandler");
const { loginService } = require("../../services/auth/authService");


exports.authLogin = asyncHandler(async (req, res)=>{
        const {body} = req;
        const {user, token} = await loginService(body);

        res.status(200).json({
            success: true,
            data: {user, token}
        })
})

