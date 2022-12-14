const Joi = require("joi");

module.exports = {
  creatPostSchema: {
    body: Joi.object().required().keys({
      desc: Joi.string().required(),
    }),
    file: Joi.object().optional(),
  },
  updatePostSchema: {
    body: Joi.object().optional().keys({
      desc: Joi.string().optional(),
      likes: Joi.object().optional(),
    }),
    file: Joi.object().optional(),
  },
  postCommentSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
  },
  deletePostSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
  },
  getPostSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
  },
};
