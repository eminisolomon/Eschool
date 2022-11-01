const School = require("../models/School");
const cloudinary = require("../config/cloudinarty");
const customError = require("../errors");

const createSchool = async (req, res) => {
    const schoolExists = await School.findOne({ name: req.body.name});
    if (schoolExists) {
        throw new customError.BadRequestError('A School with name ${req.body.name'
        );
    }
    if (req.body.logo) {
        const result = await cloudinary.uploader.upload(req.body.logo, {
            folder: "School",
        });
        const image = { public_id: result.public_id, url: result.secure_url };
        req.body.logo = image;
    }
    createdSchool = await School.create(req.body);
    res.status(200).json(createdSchool);
};

const getSchool = async (req, res) => {
    const Schools = await School.findById(req.params.school_id).populate([
        "school_name",
        "email",
    ]);
    if (!school) {
        throw new customError.NotFoundError(
            "The requeted School was not found");
        }
        res.status(200).json(school);
};

const searchSchool = async (req, res) => {
    const query = req.query.school;
    const schools = await School.find({
        name: { $regex: query, $options: "i"},
    });
    res.status(200).json(schools);
};

const getAllSchools = async (req, res) => {
    const Schools = await School.find().populate([
        "school_name",
        "email",
    ]);
    res.status(200).json(Schools);
};

const updateSchool = async (req, res) => {
    const schoolToUpdate = await School.findById(
        req.params.school_id
    ).populate([
        "school_name",
        "email",
    ]);

    if (!schoolToUpdate) {
        throw new customError.NotFoundError(
            "The requested school was not found"
        );
    }
    (req, schoolToUpdate.school_id);
};

const deleteSchool = async (req, res) => {
    const schoolToDelete = await School.findById(req, params.school_id);
    if (!schoolToDelete) {
        throw new customError.NotFoundError(
            "The requested school was not found"
        );
    }
    await schoolToDelete.remove();
    res.status(200).json("School deleted successfully");
};

module.exports = {
    createSchool,
    getSchool,
    searchSchool,
    getAllSchools,
    updateSchool,
    deleteSchool,
};