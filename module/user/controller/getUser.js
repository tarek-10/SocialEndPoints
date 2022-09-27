const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");

const getUserFun = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id == id) {
      const user = await userModel.findOne({ _id: id });
      res.status(StatusCodes.OK).json({ message: "success", user });
    } else {
      res.json({ message: "You Should Find Only Your Users" });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
  }
};

module.exports = getUserFun;
