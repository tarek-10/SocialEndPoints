const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const {
  creatPostSchema,
  updatePostSchema,
  postCommentSchema,
  deletePostSchema,
  getPostSchema,
} = require("../joi/post.validation");
const {
  CREATE_POST,
  LIKE_POST,
  UPDATE_POST,
  CREATE_COMMENT,
  DELETE_POST,
  GET_POST,
  TIMELINE_POSTS,
} = require("../endPoints");
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

//like and dislike on posts
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

//create comment

const postCommentFun = require("../controller/postComment");
router.post(
  "/post/:id/comment",
  upload.array("img", 5),
  handleValidation(postCommentSchema),
  isAuthorized(CREATE_COMMENT),
  postCommentFun
);
//end

//delete post
const deletePostFun = require("../controller/deletePost");
router.delete(
  "/delete/:id",
  handleValidation(deletePostSchema),
  isAuthorized(DELETE_POST),
  deletePostFun
);
//end

//get post
const getPostFun = require("../controller/getPost");
router.get(
  "/post/:id",
  handleValidation(getPostSchema),
  isAuthorized(GET_POST),
  getPostFun
);
//end

//timeline posts
const timeLinePostsFun = require("../controller/timeLinePosts");
router.get("/display/posts", isAuthorized(TIMELINE_POSTS), timeLinePostsFun);
//end
module.exports = router;
