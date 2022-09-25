const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");

const userVerifyFun = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user NoT Found ...!" });
    } else {
      if (user.isConfirmed == true) {
        res.json({ message: "User Is Already Exist Confirmed ...!" });
      } else {
        const confirmedUser = await userModel.findOneAndUpdate(
          { email: user.email },
          { isConfirmed: true },
          { new: true }
        );
        res.status(StatusCodes.OK).json({ message: "success", confirmedUser });
      }
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
  }
};
module.exports = userVerifyFun;
