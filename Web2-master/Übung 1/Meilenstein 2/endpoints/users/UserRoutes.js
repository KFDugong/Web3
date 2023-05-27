// npm Module
const express = require("express")
let router = express.Router()

let userService = require("./UserServices")
const authService = require("../authenticate/authenticateService")

/** Routendefinition */
// Read All Route
router.get("/", function (req, res, next) {
    // console.log("getUsers wird benutzt")
    // console.log("breakpoint: " + req.headers["authorization"])
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    const isAdmin = authService.verifyToken(req.headers["authorization"])
    if (isAdmin) {
        userService.getUsers(function (err, result) {
            if (result) {
                let userWithoutPassword = []
                result.forEach(e => {
                    const subset = {
                        userID: e.userID,
                        firstName: e.firstName,
                        lastName: e.lastName
                    }
                    userWithoutPassword.push(subset)
                });
                res.status(200).json(Object.values(userWithoutPassword))
            } else {
                res.status(404).json({error: "There was an error while getting all."})
            }
        })
    } else {
        res.status(401).json({ error: "Unauthorized access." })
    }
})

// Read one Route
router.get("/:userID", function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    // console.log("findUserByID wird genutzt")
    const user = req.params.userID

    const isUser = authService.verifyUserToken(req.headers["authorization"], user)
    if (isUser) {
        userService.findUserByID(user, function (err, result) {
            if (result) {
                const subset = {
                    userID: result.userID,
                    firstName: result.firstName,
                    lastName: result.lastName
                }
                // res.status(200).send("Found an user with the userID: " + user)
                res.status(200).json(subset)
            } else {
                res.status(404).json({error: "There was an error while getting one."})
            }
        })
    } else {
        res.status(401).json({ error: "Unauthorized access." })
    }
})

// Create Route
router.post("/", function (req, res, next) {
    // console.log("createUser wird benutzt.")
    const user = req.body

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header"
        })
    }

    const isAdmin = authService.verifyToken(req.headers["authorization"])
    if (isAdmin) {
        userService.createUser(user, function (err, result) {
            if (result) {
                const subset = {
                    userID: result.userID,
                    firstName: result.firstName,
                    lastName: result.lastName
                }
                res.status(201).json(subset)
            } else {
                res.status(400).json({error: "There was an error while creating."})
            }
        })
    } else {
        res.status(401).json({ error: "Unauthorized access." })
    }


})

// Update Route
router.put("/:userID", function (req, res, next) {
    const userID = req.params.userID;
    const userInfo = req.body;

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header"
        })
    }
    const isUser = authService.verifyUserToken(req.headers["authorization"], userID)
    if (isUser) {
        userService.updateUser(userID, userInfo, function (err, result) {
            if (result) {
                const subset = {
                    userID: result.userID,
                    firstName: result.firstName,
                    lastName: result.lastName
                }
                res.status(200).json(subset)
            } else {
                res.status(404).json({error: "There was an error while updating."})
            }
        })
    } else {
        res.status(401).json({ error: "Unauthorized access." })
    }
})

// Delete Route
router.delete("/:userID", function (req, res, next) {
    // console.log("deleteUser wird benutzt")
    const userID = req.params.userID;

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header"
        })
    }

    const isAdmin = authService.verifyToken(req.headers["authorization"])
    if (isAdmin) {
        userService.deleteUser(userID, function (err, result) {
            if (result) {
                res.status(204).send()
            } else {
                res.status(404).json({error: "There was an error while deleting."})
            }
        })
    } else {
        res.status(401).json({ error: "Unauthorized access." })
    }
})

module.exports = router;