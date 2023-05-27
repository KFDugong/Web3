// npm Module
const express = require("express")
let router = express.Router()
const userService = require("./UserServices")
const authenticateUtil = require("../utils/AuthenticationUtils")

/** Routendefinition */
// Read All Route
router.get("/", authenticateUtil.verifyToken, function (req, res, next) {
    // console.log("getUsers wird benutzt")
    // console.log("breakpoint: " + req.headers["authorization"])
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }


    userService.getUsers(function (err, result) {
        if (result) {
            let userWithoutPassword = []
            result.forEach(e => {
                const subset = {
                    userID: e.userID,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    isAdministrator: e.isAdministrator
                }
                userWithoutPassword.push(subset)
            });
            res.status(200).json(Object.values(userWithoutPassword))
        } else {
            res.status(400).json({ error: "There was an error while getting all." })
        }
    })

})

// Read one Route
router.get("/:id", authenticateUtil.verifyUserToken, function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    const user = req.params.id
    userService.findUserByID(user, function (err, result) {
        if (result) {
            const subset = {
                userID: result.userID,
                firstName: result.firstName,
                lastName: result.lastName,
                isAdministrator: result.isAdministrator
            }
            // res.status(200).send("Found an user with the userID: " + user)
            res.status(200).json(subset)
        } else {
            res.status(400).json({ error: "There was an error while getting one." })
        }
    })

})

// Create Route
router.post("/", authenticateUtil.verifyToken, function (req, res, next) {
    // console.log("createUser wird benutzt.")
    const user = req.body

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header"
        })
    }


    userService.createUser(user, function (err, result) {
        if (result) {
            const subset = {
                userID: result.userID,
                firstName: result.firstName,
                lastName: result.lastName,
                isAdministrator: result.isAdministrator
            }
            res.status(201).json(subset)
        } else {
            res.status(400).json({ error: "There was an error while creating." })
        }
    })



})

// Update Route
router.put("/:id", authenticateUtil.verifyUserToken, function (req, res, next) {
    const userID = req.params.id;
    const userInfo = req.body;

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header"
        })
    }

    userService.updateUser(userID, userInfo, function (err, result) {
        if (result) {
            const subset = {
                userID: result.userID,
                firstName: result.firstName,
                lastName: result.lastName,
                isAdministrator: result.isAdministrator
            }
            res.status(200).json(subset)
        } else {
            res.status(400).json({ error: "There was an error while updating." })
        }
    })
})

// Delete Route
router.delete("/:id", authenticateUtil.verifyToken, function (req, res, next) {
    // console.log("deleteUser wird benutzt")
    const userID = req.params.id;


    if (!req.headers.authorization) {
        console.log("HIER");
        return res.status(401).json({
            message: "Missing header"
        })
    }
    userService.deleteUser(userID, function (err, result) {
        if (result) {
            res.status(204).send()
        } else {
            res.status(400).json({ error: "There was an error while deleting." })
        }
    })

})

module.exports = router;