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
            let mappedDegreeCourse = degreeCourses.map(function(degreeCourses){
                return {
                    "id": degreeCourses._id,
                    "name": degreeCourses.name,
                    "shortName": degreeCourses.shortName,
                    "universityName": degreeCourses.universityName,
                    "universityShortName": degreeCourses.universityShortName,
                    "departmentName": degreeCourses.departmentName,
                    "departmentShortName": degreeCourses.departmentShortName
                }
            })


            return callback(null, mappedDegreeCourse)
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

                let mappedDegreeCourse = {
                    "id": degreeCourse._id,
                    "name": degreeCourse.name,
                    "shortName": degreeCourse.shortName,
                    "universityName": degreeCourse.universityName,
                    "universityShortName": degreeCourse.universityShortName,
                    "departmentName": degreeCourse.departmentName,
                    "departmentShortName": degreeCourse.departmentShortName
                }

                callback(null, mappedDegreeCourse)
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
        let mappedDegreeCourse = {
            "id": degreeCourse._id,
            "name": degreeCourse.name,
            "shortName": degreeCourse.shortName,
            "universityName": degreeCourse.universityName,
            "universityShortName": degreeCourse.universityShortName,
            "departmentName": degreeCourse.departmentName,
            "departmentShortName": degreeCourse.departmentShortName
        }
        return callback(null, mappedDegreeCourse)
    } catch (error) {
        const errors = createDegreeCourseErrorHandlers(error)
        return callback(errors, null)
    }
}



async function updateDegreeCourse(searchedID, updateInfo, callback) {

    if (!searchedID) return callback(`Cannot update a nonexistant degree course. Please enter a valid id`, null)
    try {
        const toBeUpdatedDG = await DegreeCourse.findOneAndUpdate({ _id: searchedID }, updateInfo, { new: true })
        let mappedDegreeCourse = {
            "id": toBeUpdatedDG._id,
            "name": toBeUpdatedDG.name,
            "shortName": toBeUpdatedDG.shortName,
            "universityName": toBeUpdatedDG.universityName,
            "universityShortName": toBeUpdatedDG.universityShortName,
            "departmentName": toBeUpdatedDG.departmentName,
            "departmentShortName": toBeUpdatedDG.departmentShortName
        }
        
        return callback(null, mappedDegreeCourse)
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
                let mappedDegreeCourse = {
                    "id": degreecourse._id,
                    "name": degreecourse.name,
                    "shortName": degreecourse.shortName,
                    "universityName": degreecourse.universityName,
                    "universityShortName": degreecourse.universityShortName,
                    "departmentName": degreecourse.departmentName,
                    "departmentShortName": degreecourse.departmentShortName
                }
                return callback(null, mappedDegreeCourse)
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