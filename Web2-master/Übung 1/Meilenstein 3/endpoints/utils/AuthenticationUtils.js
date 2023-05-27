const config = require("config")
const jwt = require("jsonwebtoken")

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

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    const headerInfo = req.headers["authorization"]
    const verifiedJWT = verifyJWTToken(headerInfo)
    if (verifiedJWT) {
        const token = headerInfo.split(" ")[1]
        const payloadAdmin = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if (payloadAdmin.isAdministrator) {
            return next()
        }
        res.status(403).json({ error: "Only administrator can access this function." })
        return
    } else {
        res.status(401).json({ error: "Unauthorized access." })
        return
    }
}

function verifyUserToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    const headerInfo = req.headers["authorization"]
    let userID = req.params.id
    if (!userID) {
        const token = headerInfo.split(" ")[1]
        const payloadInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        userID = payloadInfo.username
    }

    const verifiedJWT = verifyJWTToken(headerInfo)
    if (verifiedJWT) {

        const token = headerInfo.split(" ")[1]
        const payloadInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

        if (payloadInfo.isAdministrator) {
            return next()
        }

        if (payloadInfo.username == userID) {
            return next()
        }
        res.status(403).json({ error: "Unauthorized access." })
        return
    } else {
        res.status(401).json({ error: "Unauthorized access." })
        return
    }
}
module.exports = {
    verifyToken,
    verifyUserToken,
}