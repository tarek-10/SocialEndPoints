const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const postLikeFun = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findOne({ _id: id });
    if (post) {
      post.likes.push({ userId: req.user._id });
      const updatedPost = await postModel.findOneAndUpdate(
        { _id: post._id },
        {
          likes: post.likes,
        },
        { new: true }
      );

      res.status(StatusCodes.CREATED).json({ message: "success", updatedPost });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ messag: "post not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = postLikeFun;
