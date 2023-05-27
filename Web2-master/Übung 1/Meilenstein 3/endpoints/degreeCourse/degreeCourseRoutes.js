const express = require("express")
let router = express.Router()
const degreeCourseService = require("./degreeCourseService")
const authUtil = require("../utils/AuthenticationUtils")
const appService = require("../degreeCourseApplication/DegreeCourseApplicationService")

router.get("/", function (req, res, next) {

    degreeCourseService.getDGCourses(req.query, function (err, results) {
        if (results) {
            res.status(200).json(Object.values(results))
        } else {
            res.status(400).json({ error: "There was an error while getting all." })
        }
    })
})

router.get("/:id/degreeCourseApplications", authUtil.verifyToken, function (req, res, next) {

    const degreeID = req.params.id
    appService.getAppByDG(degreeID, function(err, results){
        if(err){
            res.status(400).json({error: err})
        } else {
            res.status(200).json(Object.values(results))
        }
    })
    
})

router.get("/:id", function (req, res, next) {

    const id = req.params.id
    degreeCourseService.findDGCourseByID(id, function (err, result) {
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).json({ error: "There was an error while getting one." })
        }
    })
})


router.post("/", authUtil.verifyToken, function (req, res, next) {
    const degreeCourse = req.body
    degreeCourseService.createDegreeCourse(degreeCourse, function (err, result) {
        if (result) {
            res.status(201).json(result)
        } else {
            res.status(400).json({ error: "There was an error while creating one." })
        }
    })
})

router.put("/:id", authUtil.verifyToken, function (req, res, next) {

    const id = req.params.id
    const degreeCourseInfo = req.body

    degreeCourseService.updateDegreeCourse(id, degreeCourseInfo, function (err, result) {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ error: "There was an error while updating one." })
        }
    })

})

router.delete("/:id", authUtil.verifyToken, function (req, res, next) {

    const id = req.params.id
    degreeCourseService.deleteDegreeCourse(id, function (err, result) {
        if (result) {
            res.status(204).send("Degree course got deleted successfully.")
        } else {
            res.status(400).json({ error: "There was an error while deleting one." })
        }
    })
})

module.exports = router