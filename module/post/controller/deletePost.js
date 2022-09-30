const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const deletePostFun = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findOne({ _id: id });

    if (post) {
      if (
        post.userId.toString() === req.user._id.toString() ||
        req.user.role === "admin"
      ) {
        const deletedPost = await postModel.deleteOne({ _id: post._id });

        res.status(StatusCodes.OK).json({ message: "success", deletedPost });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "OnLY ADMIN OR OWNER OF POST CAN DO THAT" });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = deletePostFun;
