const userService = require("../users/UserServices")
const config = require("config")
const jwt = require("jsonwebtoken")

async function createSessionToken(loginCredentials, callback) {
    if (!loginCredentials) return callback("Crucial information missing.", null)
    //übersetzt
    const base64Credentials = loginCredentials.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    //gibts den user
    userService.findUserByID(username, function (err, result) {
        if (err) {
            return callback(err, null)
        } else {
            return
        }
    })
    //erstellt token 
    try {
        await userService.authenticate({ username, password }, function (err, result) {

            if (result) {
                const jwtKey = config.get("authentication").tokenKey
                const jwtTime = config.get("authentication").defaultTime

                let token = jwt.sign({ "username": result.userID, "isAdministrator": result.isAdministrator }, jwtKey, {
                    algorithm: "HS256",
                    expiresIn: jwtTime
                })
                return callback(null, token, result)
            } else {
                return callback("Wrong credentials. Authentication failed.", null, null)
            }
        });
    } catch (error) {
        return callback(error, null)
    }
}

function getUserIDFromToken(loginCredentials) {
    if (!loginCredentials) {
        return callback("Crucial information missing.")
    }
    const token = loginCredentials.split(" ")[1]
    const payloadInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    const username = payloadInfo.username
    // console.log(credentials)
    return username  
}

module.exports = {
    createSessionToken,
    getUserIDFromToken
}