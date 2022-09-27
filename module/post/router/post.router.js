const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const { creatPostSchema, updatePostSchema } = require("../joi/post.validation");
const { CREATE_POST, LIKE_POST, UPDATE_POST } = require("../endPoints");
const upload = require("../../../middleware/multer");

const router = express.Router();

//create post
const createPostFun = require("../controller/createPost");
const isAuthorized = require("../../../middleware/isAuthorized");
router.post(
  "/post",
  upload.single("img"),
  handleValidation(creatPostSchema),
  isAuthorized(CREATE_POST),
  createPostFun
);
//end

//like on post
const postLikeFun = require("../controller/postLike");
router.post("/post/:id/like", isAuthorized(LIKE_POST), postLikeFun);
//end

//update post
const updatePostFun = require("../controller/updatePost");
router.put(
  "/post/:id",
  upload.single("img"),
  handleValidation(updatePostSchema),
  isAuthorized(UPDATE_POST),
  updatePostFun
);
//end

module.exports = router;
