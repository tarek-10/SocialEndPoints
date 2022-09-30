const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");
const userModel = require("../../../model/user.model");

const timeLinePostsFun = async (req, res) => {
  const user = await userModel.findById({ _id: req.user._id });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
  } else {
    const posts = await postModel.find({ userId: user._id });
    let friendsPosts = [];
    for (let i = 0; i < user.following.length; i++) {
      friendsPosts.push(await postModel.find({ userId: user.following[i] }));
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "success", allPosts: posts.concat(...friendsPosts) });
  }
};
module.exports = timeLinePostsFun;
