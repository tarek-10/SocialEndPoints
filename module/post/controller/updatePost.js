const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const updatePostFun = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const post = await postModel.findOne({ _id: id });
    console.log(req.user._id.toString());
    console.log(post.userId.toString());
    if (post) {
      if (post.userId.toString() === req.user._id.toString()) {
        let url = post.image;
        if (req.file) {
          url = "";
          url = process.env.IMAGE_URL + req.file.filename;
        }

        const updatedPost = await postModel.findOneAndUpdate(
          { _id: post._id },
          {
            image: url,
            $set: body,
          }
        );
        res.status(StatusCodes.OK).json({ message: "success", updatedPost });
      } else {
        res.json({ message: "You Can Only Update Your Post ...!" });
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
module.exports = updatePostFun;
