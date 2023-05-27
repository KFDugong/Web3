const express = require("express")
let router = express.Router()
const authService = require("../authenticate/authenticateService")

const degreeCourseService = require("./degreeCourseService")

router.get("/", function (req, res, next) {

    degreeCourseService.getDGCourses(req.query, function (err, results) {
        if (results) {
            res.status(200).json(Object.values(results))
        } else {
            res.status(404).json({ error: "There was an error while getting all." })
        }
    })
})

router.get("/:id", function (req, res, next) {

    const id = req.params.id
    degreeCourseService.findDGCourseByID(id, function (err, result) {
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).json({ error: "There was an error while getting one." })
        }
    })
})


router.post("/", function (req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    const isAdmin = authService.verifyToken(req.headers["authorization"])
    if (isAdmin) {
        const degreeCourse = req.body
        degreeCourseService.createDegreeCourse(degreeCourse, function (err, result) {
            if (result) {
                res.status(201).json(result)
            } else {
                res.status(400).json({ errors: "There was an error while creating one." })
            }
        })
    } else {
        res.status(401).json({ errors: "Unauthorized access." })
    }

})

router.put("/:id", function (req, res, next) {

    const id = req.params.id
    const degreeCourseInfo = req.body
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    const isAdmin = authService.verifyToken(req.headers["authorization"])
    if (isAdmin) {
        degreeCourseService.updateDegreeCourse(id, degreeCourseInfo, function (err, result) {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ error: "There was an error while updating one." })
            }
        })
    } else {
        return res.status(401).json({ error: "Unauthorized access." })
    }

})

router.delete("/:_id", function (req, res, next) {


    const id = req.params._id
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing header. User must log in."
        })
    }
    const isAdmin = authService.verifyToken(req.headers["authorization"])
    if (isAdmin) {
        degreeCourseService.deleteDegreeCourse(id, function (err, result) {
            if (result) {
                res.status(204).send("Degree course got deleted successfully.")
            } else {
                res.status(404).json({ error: "There was an error while deleting one." })
            }
        })
    } else {
        res.status(401).json({ error: "Unauthorized access." })
    }


})

module.exports = router