const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const {
  userSignUpSchema,
  userVerifySchema,
  userSignInSchema,
  updateUserSchema,
  deleteUserSchema,
  getUserSchema,
  followinUserSchema,
} = require("../joi/user.validation");

const router = express.Router();

//create user
const signUpFun = require("../controller/signup.controller");
const upload = require("../../../middleware/multer");
router.post(
  "/user/signup",
  upload.array("image", 5),
  handleValidation(userSignUpSchema),
  signUpFun
);
//end

//verify user
const userVerifyFun = require("../controller/userVerify");
router.get("/verify/:token", handleValidation(userVerifySchema), userVerifyFun);
//end

//login user
const signInFun = require("../controller/signin.controller");
const isAuthorized = require("../../../middleware/isAuthorized");
const {
  UPDATING_USER,
  DELETE_USER,
  GET_USER,
  FOLLOWING_USER,
  UNFOLLOWING_USER,
} = require("../endPoints");
router.post("/user/signin", handleValidation(userSignInSchema), signInFun);
//end

//updating user
const updateUserFun = require("../controller/updateUser");
router.put(
  "/user/update/:id",
  upload.array("image", 5),
  handleValidation(updateUserSchema),
  isAuthorized(UPDATING_USER),
  updateUserFun
);
//end

//delete user
const deleteUserFun = require("../controller/deleteUser");
router.delete(
  "/user/delete/:id",
  handleValidation(deleteUserSchema),
  isAuthorized(DELETE_USER),
  deleteUserFun
);
//end

//get user
const getUserFun = require("../controller/getUser");
router.get(
  "/user/:id",
  handleValidation(getUserSchema),
  isAuthorized(GET_USER),
  getUserFun
);
//end

//following
const followUsersFun = require("../controller/followingUser");
router.put("/follow", isAuthorized(FOLLOWING_USER), followUsersFun);
//end

//unfollowing
const unFollowUsersFun = require("../controller/unfollowingUser");
router.put("/unfollow", isAuthorized(UNFOLLOWING_USER), unFollowUsersFun);
//end

module.exports = router;
