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
    userService.findUserByID(username, function(err, result){
        if(err){
            return callback(err, null)
        } else{
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

function verifyJWTToken(headerInfo) {
    if (typeof headerInfo !== undefined) {
        const privateKey = config.get("authentication").tokenKey
        const token = headerInfo.split(" ")[1]

        const verified = jwt.verify(token, privateKey, { algorithm: "HS256" }, (err) => {
            if (err) {
                console.log(err.message)
            } else {
                return true
            }
        })
        if (verified) {
            return true
        } else {
            return false
        }
    }
}

function verifyToken(headerInfo) {

    const verifiedJWT = verifyJWTToken(headerInfo)

    if (verifiedJWT) {
        const token = headerInfo.split(" ")[1]
        const payloadAdmin = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if (payloadAdmin.isAdministrator) {
            return true
        }
        return false
    } else {
        return false
    }
}

function verifyUserToken(headerInfo, userID) {
    const verifiedJWT = verifyJWTToken(headerInfo)
    if (verifiedJWT) {
        const token = headerInfo.split(" ")[1]
        const payloadInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if (payloadInfo.isAdministrator) {
            return true
        }
        if (payloadInfo.username == userID) {
            return true
        }
        return false
    } else {
        return false
    }
}

module.exports = {
    createSessionToken,
    verifyToken,
    verifyUserToken
}