const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");

const deleteUserFun = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({ _id: id });

    if (user) {
      if (user._id == req.user._id || req.user.role == "admin") {
        const deletedUser = await userModel.deleteOne({ _id: user._id });

        res.status(StatusCodes.OK).json({ message: "success", deletedUser });
      } else {
        res.json({ message: "only same user can delete his account or admin" });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
  }
};
module.exports = deleteUserFun;
