const Admin = require("../models/Admin");
const StatusCodes = require("http-status-codes");
const { userTokenPayload, createJWT } = require("../utils");
const CustomError = require("../errors");
const cloudinary = require("services/cloudinary");

const createUser = async (req, res) => {
    if (req.body.phone != null) {
        const { phone } = req.body;
        const numberAlreadyExists = await Admin.findOne({phone
        });

    if (numberAlreadyExists) {
        throw new CustomError.BadRequestError(
            "Phone number already exists");
    }
} else if (req.body.email != null) {
    const emailAlreadyExists = await Admin.findOne({
        email: req.body.email
    });

    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError(
            "Email address already exists");
    }
} else if (req.body.username!= null) {
    const usernameAlreadyExists = await Admin.findOne({
        username: req.body.username
    });
    if (usernameAlreadyExists) {
        throw new CustomError.BadRequestError(
            "Username already exists");
        }
    }

    const result = await cloudinary.uploader.upload(req.body.profilePic, {
        folder: "users",
    });
    const image = { public_id: result.public_id, url: result.secure_url };
    req.body.profilePic = image;

    const admin = await Admin.create(req.body);
    const tokenUser =userTokenPayload(user);
    const token = createJWT({ payload: tokenUser });

    const currentTime = Date.now().toString();

    res.status(200).json({ user, token });
};

const login = async (req, res) => {
    let user;
    if (req.body.email!= null) {
        const phone = req.body.phone;
        user = await Admin.findOne({ phone }).select("+password");
        } else {
            user = await Admin.findOne({ email: req.body.email }).select("+password");
        }
        if (!user) {
            throw new CustomError.UnauthenticatedError(
                "User not found");
            }
            const isPasswordCorrect = await user.comparePassword(req.body.password, user.password);
            if (!isPasswordCorrect) {
                throw new CustomError.UnauthenticatedError(
                    "Wrong Password");
                }
                const tokenUser = userTokenPayload(user);

                const token = createJWT({ payload: tokenUser });

                res.status(200).json({ user, token });
            };

            const logout = async (req, res) => {
                res.status(StatusCodes.OK).json({ msg: "Logged out" });
            };

            module.exports = {
                createUser,
                login,
                logout,
            };