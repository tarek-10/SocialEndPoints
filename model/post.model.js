const mongoose = require("mongoose");
const postSchema = require("../schema/post.schema");

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
