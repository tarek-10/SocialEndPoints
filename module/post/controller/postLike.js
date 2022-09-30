const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const postLikeFun = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findOne({ _id: id });
    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
    } else {
      const findLike = post.likes.find((ele) => {
        return ele.userID.toString() == req.user._id.toString();
      });
      if (!findLike) {
        const likePosts = await postModel
          .findOneAndUpdate(
            { _id: post._id },
            {
              $push: {
                likes: {
                  userID: req.user._id,
                },
              },
            },
            { new: true }
          )
          .populate([
            {
              path: "likes.userID",
              model: "user",
              select: "username profilePicture",
            },
          ]);

        res
          .status(StatusCodes.CREATED)
          .json({ message: "success like post", likePosts });
      } else {
        const disLikePosts = await postModel
          .findOneAndUpdate(
            { _id: post._id },
            {
              $pull: {
                likes: {
                  userID: req.user._id,
                },
              },
            },
            { new: true }
          )
          .populate([
            {
              path: "likes.userID",
              model: "user",
              select: "username  profilePicture",
            },
          ]);
        res
          .status(StatusCodes.CREATED)
          .json({ message: "success dislike post", disLikePosts });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = postLikeFun;
