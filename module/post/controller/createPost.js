const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const createPostFun = async (req, res) => {
  try {
    const { desc } = req.body;
    let url = "";
    if (req.file) {
      url = process.env.IMAGE_URL + req.file.filename;
    }

    const post = await postModel.insertMany({
      userId: req.user._id,
      desc,
      image: url,
    });

    res.status(StatusCodes.CREATED).json({ message: "sucess", post });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = createPostFun;
