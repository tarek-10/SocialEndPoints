const { StatusCodes } = require("http-status-codes");
const senEmail = require("../../../middleware/sendEmail");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");

const signUpFun = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      res.json({ message: "user already exist" });
    } else {
      let imageUrl = [];

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          imageUrl.push(process.env.IMAGE_URL + req.files[i].filename);
        }
      }

      const token = jwt.sign({ email }, process.env.SECRET_KEY);

      let message = `<a href ='http://localhost:3000/verify/${token}'> Verify Your Email </a>`;

      const addUser = new userModel({
        username,
        email,
        password,
        profilePicture: imageUrl,
        coverPicture: imageUrl,
      });

      const newUser = await addUser.save();
      res.status(StatusCodes.CREATED).json({ message: "success", newUser });
      await senEmail(email, message);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
  }
};

module.exports = signUpFun;
