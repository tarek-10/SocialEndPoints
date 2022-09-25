const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signInFun = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user not found register firstly..!" });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          { email: user.email, role: user.role, _id: user._id },
          process.env.SECRET_KEY
        );

        res.status(StatusCodes.OK).json({
          message: "success",
          token,
          user: {
            _id: user._id,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "invalid password ...!" });
      }
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
  }
};
module.exports = signInFun;
