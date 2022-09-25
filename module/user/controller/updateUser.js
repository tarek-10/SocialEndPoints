const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const bcrypt = require("bcrypt");

const updateUserFun = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await userModel.findOne({ _id: id });

    if (user) {
      let urls = [...user.profilePicture];
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          urls.push(process.env.IMAGE_URL + req.files[i].filename);
        }
      }

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await userModel.findOneAndUpdate(
        { email: user.email },
        {
          profilePicture: urls,
          coverPicture: urls,
          $set: body,
        },
        { new: true }
      );

      res.status(StatusCodes.OK).json({ message: "success", updatedUser });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ messge: "User Not Found" });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
  }
};
module.exports = updateUserFun;
