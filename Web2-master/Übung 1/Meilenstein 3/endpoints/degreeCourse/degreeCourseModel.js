const mongoose = require("mongoose")

const degreeCourseSchema = new mongoose.Schema({
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
    },
    departmentShortName: {
        type: String,
        required: [true, "DPS is required."]
    }
})

const degreeCourse = mongoose.model("Degree Course", degreeCourseSchema)

module.exports = degreeCourse