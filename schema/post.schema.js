const mongoose = require("mongoose");
const likesSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: [likesSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = postSchema;
