const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");

const followUsersFun = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById({ _id: req.user._id });
    if (user) {
      const currentUser = await userModel.findById({ _id: userId });

      if (currentUser) {
        if (!user.followers.includes(userId)) {
          const updatedUser = await userModel.findOneAndUpdate(
            { _id: user._id },
            {
              $push: {
                followers: userId,
              },
            },
            { new: true }
          );
          const updatedCurrentUser = await userModel.findOneAndUpdate(
            { _id: currentUser._id },
            {
              $push: {
                following: req.user._id,
              },
            },
            { new: true }
          );

          res.status(StatusCodes.OK).json({ message: "success", updatedUser });
        } else {
          res.json({ message: "You Already follow this user...!" });
        }
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "FOLLOWING USER NOT FOUND ...!" });
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user Not Found ...!" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = followUsersFun;
