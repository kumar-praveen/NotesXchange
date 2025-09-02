import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/nodemailer.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";

export const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Please provide the required details",
        success: false,
      });
    }

    const { fullname, email, password } = req.body;

    if (!fullname) {
      return res
        .status(400)
        .json({ message: "Fullname is required", success: false });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be greater than 6 characters",
        success: false,
      });
    }

    if (password.length > 16) {
      return res.status(400).json({
        message: "Password must be smaller than 16 characters",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const verificationCode = generateVerificationCode();
    newUser.verificationCode = verificationCode;
    console.log("Going to send the email");
    await sendEmail(verificationCode, newUser.email, newUser.fullname);
    await newUser.save();

    return res.status(200).json({
      message: "OTP sent successfully on your email",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Email and OTP is missing", success: false });
    }

    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email or OTP is missing" });
    }

    const userAllEntries = await User.find({
      email,
      isVerified: false,
    }).sort({ createdAt: -1 });

    if (!userAllEntries) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    let user;
    if (userAllEntries > 1) {
      user = userAllEntries[0];
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        isVerified: false,
      });
    } else {
      user = userAllEntries[0];
    }

    if (user.verificationCode != Number(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP entered" });
    }

    const currTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpiry
    ).getTime();

    if (currTime > verificationCodeExpire) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has been expired" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    await user.save({ validateModifiedOnly: true });
    await sendEmail(null, email, user.fullname);
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.fullname.split(" ")[0]}`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Please provide the required details",
        success: false,
      });
    }

    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Password is incorrect", success: false });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.MY_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        token,
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()), httpOnly: true })
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
