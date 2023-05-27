const express = require("express")
let router = express.Router()

const degreeCourseService = require("./degreeCourseService")

router.get("/", function(req, res, next){
    degreeCourseService.getDGCourses(function(err, results){
        if(results){
            res.status(200).json(Object.values(results))
        } else {
            res.status(404).json({error: err})
        }
    })
})

router.get("/id", function(req, res, next){
    const id = req.params.id
    degreeCourseService.findDGCourseByID(id, function(err, result){
        if(result){
            res.status(200).json(result)
        } else {
            res.status(404).json({error: err})
        }
    })
})

router.post("/", function(req, res, next){
    const degreeCourse = req.body

    degreeCourseService.createDegreeCourse(degreeCourse, function(err, result){
        if(result){
            res.status(201).json({degreeCourseCreated: result})
        } else {
            res.status(400).json({errors: err})
        }
    })
})

router.put("/:id", function(req, res, next){
    const id = req.params.id
    const degreeCourseInfo = req.body

    degreeCourseService.updateDegreeCourse(id, degreeCourseInfo, function(err, result){
        if(result){
            res.status(200).json({updatedDegreeCourse: result})
        } else {
            res.status(404).json({error: err})
        }
    })
})

router.delete("/:id", function(req, res, next){
    const id = req.params.id

    degreeCourseService.deleteDegreeCourse(id, function(err,result){
        if(result){
            res.status(204).send("Degree course got deleted successfully.")
        } else {
            res.status(404).json({error: err})
        }
    })
})

module.exports = router