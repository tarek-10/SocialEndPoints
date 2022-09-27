const {
  CREATE_POST,
  LIKE_POST,
  UPDATE_POST,
} = require("../../module/post/endPoints");
const {
  UPDATING_USER,
  DELETE_USER,
  GET_USER,
  FOLLOWING_USER,
  UNFOLLOWING_USER,
} = require("../../module/user/endPoints");

module.exports = [
  UPDATING_USER,
  DELETE_USER,
  GET_USER,
  FOLLOWING_USER,
  UNFOLLOWING_USER,
  CREATE_POST,
  LIKE_POST,
  UPDATE_POST,
];
