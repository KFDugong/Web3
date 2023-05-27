const mongoose = require("mongoose")

const degreeCourseApplicationSchema = new mongoose.Schema({
    applicantUserID : {
        type: String,
        required: [true, "User ID from applicant is required."]
    },
    courseDegreeID: {
        type: String,
        required: [true, "Degree course ID is required."]
    }, 
    targetPeriodYear: {
        type: Number,
        required: [true, "Target period year is required."]
    },
    targetPeriodShortName: {
        type: String,
        required: [true, "Target period short name is required."]
    }
})

const degreeCourseApplication = mongoose.model("Degree Course Application", degreeCourseApplicationSchema)

module.exports = degreeCourseApplication