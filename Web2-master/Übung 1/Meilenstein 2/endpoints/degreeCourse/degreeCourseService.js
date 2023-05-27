const { default: mongoose } = require("mongoose")
const DegreeCourse = require("./degreeCourseModel")

const createDegreeCourseErrorHandlers = err => {
    let errors = {
        name: "",
        shortName: "",
        universityName: "",
        universityShortName: "",
        departmentName: "",
        departmentShortName: ""
    }
    // if (err.code == 11000) {
    //     errors.id = "This id already exists."
    // }
    if (err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

function getDGCourses(query, callback) {
    DegreeCourse.find(query, function (err, degreeCourses) {
        if (err) {
            return callback(err, null)
        } else {
            return callback(null, degreeCourses)
        }
    })
}

function findDGCourseByID(searchedID, callback) {
    if (!searchedID) {
        return callback("ID is missing.", null)
    } else {
        let query = DegreeCourse.findOne({ _id: searchedID })
        query.exec(function (err, degreeCourse) {
            if (degreeCourse) {
                callback(null, degreeCourse)
            } else {
                return callback(`Did not find the degree course with the ID: ${searchedID}`, null)
            }
        })
    }
}

async function createDegreeCourse(degreeCourseBody, callback) {

    const doesDGexist = await DegreeCourse.findOne(degreeCourseBody)
    if (doesDGexist) {
        return callback("Degreecourse already exists.", null)
    }
    try {
        const degreeCourse = await DegreeCourse.create(degreeCourseBody)
        return callback(null, degreeCourse)
    } catch (error) {
        const errors = createDegreeCourseErrorHandlers(error)
        return callback(errors, null)
    }
}



async function updateDegreeCourse(searchedID, updateInfo, callback) {

    if (!searchedID) return callback(`Cannot update a nonexistant degree course. Please enter a valid id`, null)
    try {
        const toBeUpdatedDG = await DegreeCourse.findOneAndUpdate({ _id: searchedID }, updateInfo, { new: true })
        return callback(null, toBeUpdatedDG)
    } catch (error) {
        return callback("Could not update degree course", null)
    }
}

function deleteDegreeCourse(deleteID, callback) {

    if (!deleteID) {
        return callback("Cannot delete a nonexistant degree course.", null)
    } else {
        let query = DegreeCourse.findOneAndDelete({ _id: deleteID })
        query.exec(function (err, degreecourse) {
            if (degreecourse) {
                return callback(null, degreecourse)
            } else {
                return callback(`Cannot delete user with the ID: ${deleteID}, because this degree course does not exits. Please enter a valid id!`, null)
            }
        })
    }
}

module.exports = {
    getDGCourses,
    createDegreeCourse,
    findDGCourseByID,
    updateDegreeCourse,
    deleteDegreeCourse
}