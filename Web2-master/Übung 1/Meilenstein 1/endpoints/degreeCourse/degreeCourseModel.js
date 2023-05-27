const mongoose = require("mongoose")

const degreeCourseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Id is required."],
        unique: [true, "This id already exists."]
    },
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    shortName: {
        type: String,
        require: [true, "Short Name is required."]
    },
    universityName: {
        type: String,
        required: [true, "University name is required."]
    },
    universityShortName:{
        type: String,
        required: [true, "University short name is required."]
    },
    departmentName: {
        type: String,
        required: [true, "Department name is required."]
    }
})

const degreeCourse = mongoose.model("Degree Course", degreeCourseSchema)

module.exports = degreeCourse