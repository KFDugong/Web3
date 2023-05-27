// npm Module
const express = require("express")
let router = express.Router()

let userService = require("../users/UserServices")

/** Routendefinition */ 

// Read All Route
router.get("/", function (req, res, next) {
    // console.log("getUsers wird benutzt")

    userService.getUsers(function (err, result) {
        if (result) {
            res.status(200).json(Object.values(result))
        } else {
            res.status(404).json({error: "There was an error while getting all."})
        }
    })
})

// Read one Route
router.get("/:userID", function (req, res, next) {
    // console.log("findUserByID wird genutzt")
    const user = req.params.userID
    userService.findUserByID(user, function (err, result) {
        if (result) {
            // res.status(200).send("Found an user with the userID: " + user)
            res.status(200).json(result)
        } else {
            res.status(404).json({error: "There was an error while getting one."})
        }
    })
})

// Create Route
router.post("/", function (req, res, next) {
    // console.log("createUser wird benutzt.")
    const user = req.body

    userService.createUser(user, function (err, result) {
        if (result) {
            res.status(201).json(result)
        } else {
            res.status(400).json({error: "There was an error while creating."})
        }
    })
})

// Update Route
router.put("/:userID", function (req, res, next) {
    // console.log("updateUser wird benutzt.")

    const userID = req.params.userID;
    const userInfo = req.body;
    // console.log(userID)
    // console.log(userInfo)

    userService.updateUser(userID, userInfo, function (err, result) {
        if(result){
            res.status(200).json(result)
        } else {
            res.status(404).json({error: "There was an error while updating."})
        }
    })
})

// Delete Route
router.delete("/:userID", function (req, res, next) {
    // console.log("deleteUser wird benutzt")
    const userID = req.params.userID;

    userService.deleteUser(userID, function (err, result) {
        if (result) {
            res.status(204).send()
        } else {
            res.status(404).json({error: "There was an error while deleting."})
        }
    })
})

module.exports = router;