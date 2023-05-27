const router = require("express").Router()
const authService = require("./authenticateService")

router.get("/", function (req, res) {
    authService.createSessionToken(req.headers.authorization, function (err, token, user) {

        if (!token) {
             res.status(401).json({ error: err })
        } else {
            res.status(200).setHeader("Authorization", "Bearer " + token).json({ Success: "Token created successfully" })
        }
       
    })
})

module.exports = router