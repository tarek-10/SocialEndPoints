const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const getPostFun = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findOne({ _id: id });
    if (post) {
      const displayPost = await postModel.findById({ _id: id }).populate([
        {
          path: "userId",
          model: "user",
          select: "username",
        },
      ]);
      res.status(StatusCodes.OK).json({ message: "success", displayPost });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = getPostFun;
