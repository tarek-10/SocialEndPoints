const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const postCommentFun = async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;

    const post = await postModel.findOne({ _id: id });

    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found ...!" });
    } else {
      let urls = [];
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          urls.push(process.env.IMAGE_URL + req.files[i].filename);
        }
      }

      post.comment.push({ desc, image: urls, userID: req.user._id });

      const updatedPost = await postModel.findOneAndUpdate(
        { _id: post._id },
        { comment: post.comment },
        { new: true }
      );
      res.status(StatusCodes.CREATED).json({ message: "success", updatedPost });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = postCommentFun;
