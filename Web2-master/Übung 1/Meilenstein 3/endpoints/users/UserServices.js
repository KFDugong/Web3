// Modulimport
const bcrypt = require("bcryptjs")
const { update } = require("./UserModel")
const User = require("./UserModel")

/**
 * Get Collection of all users in database 
 * From First-Steps Video
 * 
 * @param {*} callback - gives back the callback function for UserRoute.js
 */
function getUsers(callback) {
    User.find(function (err, users) {
        if (err) {
            // console.error("Error on search: " + err)
            return callback(err, null)
        } else {
            // console.log("Everything works fine")
            return callback(null, users)
        }
    })
}

/**
 * Handler for validation and requirement errors in the createUser function
 * 
 * @param {*} err 
 * @returns the handled errors, so that the createUser function can properly return error messages to the UserRoutes
 */
const createUserErrorHandlers = (err) => {
    let errors = {
        userID: "",
        firstName: "",
        lastName: "",
        password: ""
        // email: ""
    }

    // Duplicate Error with the error code 11000 - mongoose internal error code
    if (err.code == 11000) {

        errors.userID = "This userID already exists."
        // errors.email = "This email already exists."
    }

    //validation errors
    // let validationmessage = "User validation failed"
    // validationmessage = validationmessage.toLowerCase();
    if (err.message.includes("validation failed")) {
        console.log(err)
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

/**
 * Asynchronous function to create a new user in the database. 
 * Checks for validation and requirements in the catch block 
 * 
 * @param {*} aboutToBeCreated The json-body which comes from UserRoutes 
 * @param {*} callback A callback function that lets the UserRoutes handle the results depending on the return parameter of this funciton
 * @returns Either the created user or if there is an error, the corresponding error message as a json-body.
 */
async function createUser(aboutToBeCreated, callback) {
    // const { userID, firstName, lastName, password } = aboutToBeCreated;
    // const usertest = await User.create(aboutToBeCreated)
    // console.log(usertest)
    try {
        const user = await User.create(aboutToBeCreated)
        return callback(null, user)
    } catch (error) {

        return callback(error, null)
    }
}

// let query = User.findOne({ userID: aboutToBeCreated.userID })
// query.exec(
//     function (user, err) {
//         if (user) {
//             console.log("Cannot create user, because this user already exists")
//             return callback(`Cannot create user with the ID: ${aboutToBeCreated.userID} already exists` , null)
//         } else {
//             User.create(aboutToBeCreated)

//             return callback(null, aboutToBeCreated)
//         }
//     }
// )

/**
 * Code comes from the First-Steps video and is modified for the first milestone. 
 * The creation of a standard administrator was removed. 
 * Finds a user in the database depending on the searched user ID.
 * @param {*} searchedUserID User ID created by the user himself and not the object ID given from the database
 * @param {*} callback Callback function that handles the results depending on the return value after the search in the database
 * @returns The callback function for UserRoutes to handle the corresponding response to the webpage
 */
function findUserByID(searchedUserID, callback) {
    if (!searchedUserID) {
        callback("UserID is missing", null)
        return
    } else {
        let query = User.findOne({ userID: searchedUserID })
        query.exec(function (err, user) {
            if (user) {
                callback(null, user)
            } else {
                return callback(`Did not find an user with the ID: ${searchedUserID}`, null)

            }
        })
    }
}

/**
 * Asynchronous function to first find the searched user then to update the passed in information for the given user. 
 * 
 * @param {*} findByID The passed in user ID to look for it in the database. 
 * @param {*} updateInfo The passed in json body from the request. If it contains an updated password, it needs to hash the new password.
 * @param {*} callback Callback function for UserRoutes to handle the corresponding response to the webpage.
 * @returns The callback function
 */
async function updateUser2(findByID, updateInfo, callback) {

    // Überprüft, ob zu den neuen Eigenschaften ein Passwort enthält und hashed das neue Passwort, wenn es vorhanden ist.
    if (updateInfo.password) {
        const salt = await bcrypt.genSalt()
        updateInfo.password = await bcrypt.hash(updateInfo.password, salt)
    }

    // Überprüft, ob überhaupt eine ID zum Suchen des Users eingegeben wurde.
    if (!findByID) {
        callback("Cannot update a nonexistant user. Please enter a valid userID.", null)
        return
    }

    // Updated den user, falls alle vorgaben eingehalten wurden.
    User.findOneAndUpdate({ userID: findByID }, updateInfo, (err) => {
        if (err) {
            return callback(err, null)
        } else {
            let query = User.findOne({ userID: findByID })
            query.exec(function (err, user) {
                if (user) {
                    callback(null, user)
                } else {
                    return callback(`Cannot update user because this ID: ${findByID} does not exists. Please enter a valid userID!`, null)
                }
            })
        }
    })
}

async function updateUser(findByID, updateInfo, callback) {
    if (!findByID) return callback("Cannot update a nonexistant user. Please enter a valid userID", null)
    try {
        const toBeUpdatedUser = await User.findOne({userID: findByID})
        if(updateInfo.firstName) toBeUpdatedUser.firstName = updateInfo.firstName
        if(updateInfo.lastName) toBeUpdatedUser.lastName = updateInfo.lastName
        if(updateInfo.password) toBeUpdatedUser.password = updateInfo.password
        if(updateInfo.isAdministrator !== undefined || updateInfo.isAdministrator !== null) toBeUpdatedUser.isAdministrator = updateInfo.isAdministrator
        if(updateInfo.userID){
            const updateUserID = await User.findOne({userID: updateInfo.userID})
            if(updateUserID){
                return callback("User already exists. Please enter a different userID.", null)
            } else {
                toBeUpdatedUser.userID = updateInfo.userID
            }
        }
        const updatedUser = await toBeUpdatedUser.save()
        return callback(null, updatedUser)
    } catch (error) {

        return callback("Could not update user.", null)
    }
}


/**
 * Function to first find the user then to delete the user if it exists. 
 * @param {*} aboutToBeDeleted Passed in user ID to look for in the database
 * @param {*} callback Callback function for UserRoutes to handle the corresponding response for the webpage.
 */
function deleteUser(aboutToBeDeleted, callback) {
    if (!aboutToBeDeleted) {
        callback("Cannot delete a nonexisting user.", null)
    }
    let query = User.findOneAndRemove({ userID: aboutToBeDeleted })
    query.exec(function (err, user) {
        if (user) {
            // console.log("User with the userID: " + aboutToBeDeleted + " is getting deleted.")
            // User.deleteOne(user)
            // User.findOneAndDelete({userID: aboutToBeDeleted})

            callback(null, user)
        } else {
            return callback(`Cannot delete user with the ID: ${aboutToBeDeleted}, because this user does not exists. Please enter a valid ID!`, null)
        }
    })
}

function createDefaultAdmin(callback) {
    let query = User.findOne({ userID: "admin" })
    query.exec(async function (err, user) {
        if (user) {
            return
        } else {
            const defaultAdmin = new User({
                userID: "admin",
                firstName: "Udo",
                lastName: "Müller",
                password: "123",
                isAdministrator: true
            })

            try {
                const defAdmin = await defaultAdmin.save()
            } catch (error) {
                return callback("There is a problem while creating a default administrator.")
            }


        }
    })

}

async function authenticate(loginData, callback){
    try {
        const loginUser = await User.findOne({userID: loginData.username})
        if(loginUser){
            loginUser.comparePassword(loginData.password, function(err, isMatch){
                if(isMatch){
                    return callback(null, loginUser)
                } 
                return callback(err, null)
            })
        }
    } catch (error) {
        return callback("Authentication failed.", null)
    }
}

// Exports
module.exports = {
    getUsers,
    createUser,
    findUserByID,
    updateUser,
    deleteUser,
    createDefaultAdmin,
    authenticate
}
