const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const {
  userSignUpSchema,
  userVerifySchema,
  userSignInSchema,
  updateUserSchema,
  deleteUserSchema,
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
const { UPDATING_USER, DELETE_USER } = require("../endPoints");
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

module.exports = router;
