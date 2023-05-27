const DegreeCourse = require("./degreeCourseModel")

function getDGCourses(callback) {
    DegreeCourse.find(function (err, degreeCourses) {
        if (err) {
            return callback(err, null)
        } else {
            return callback(null, degreeCourses)
        }
    })
}

const createDegreeCourseErrorHandlers = err => {
    let errors = {
        id: "",
        name: "",
        shortName: "",
        universityName: "",
        universityShortName: "",
        departmentName: ""
    }

    if (err.code == 11000) {
        errors.id = "This id already exists."
    }

    if (err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

async function createDegreeCourse(degreeCourseBody, callback) {
    try {
        const degreeCourse = await DegreeCourse.create(degreeCourseBody)
        return callback(null, degreeCourse)
    } catch (error) {
        const errors = createDegreeCourseErrorHandlers(error)
        return callback(errors, null)
    }
}

function findDGCourseByID(searchedID, callback) {
    if (!searchedID) {
        return callback("ID is missing.", null)
    } else {
        let query = DegreeCourse.findOne({ id: searchedID })
        query.exec(function (err, degreeCourse) {
            if (degreeCourse) {
                callback(null, degreeCourse)
            } else {
                return callback(`Did not find the degree course with the ID: ${searchedID}`, null)
            }
        })
    }
}

async function updateDegreeCourse(searchedID, updateInfo, callback) {
    if (!searchedID) {
        return callback(`Cannot update a nonexistant degree course. Please enter a valid id`, null)
    }

    DegreeCourse.findOneAndUpdate({id: searchedID}, updateInfo, err => {
        if(err){
            return callback(err, null)
        } else {
            let query = DegreeCourse.findOne({id: searchedID})
            query.exec(function(err, degreeCourse){
                if(degreeCourse){
                    callback(null, degreeCourse)
                } else {
                    return callback(`Cannot update degree course because this ID: ${searchedID} does not exits. Please enter a valid id!`, null)

                }
            })
        }
    })
}

function deleteDegreeCourse(deleteID, callback){
    if(!deleteID){
        return callback("Cannot delete a nonexistant degree course." , null)
    } else {
        let query = DegreeCourse.findOneAndRemove({id: deleteID})
        query.exec(function(err, degreecourse) {
            if(degreecourse){
                return callback(null, degreecourse)
            } else{
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