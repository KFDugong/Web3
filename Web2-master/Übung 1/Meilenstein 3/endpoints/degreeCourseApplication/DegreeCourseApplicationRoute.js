const router = require("express").Router()
const authService = require("../authenticate/authenticateService")
const degreeCourseApplicationService = require("./DegreeCourseApplicationService")
const authUtil = require("../utils/AuthenticationUtils")

router.get("/", authUtil.verifyToken, function (req, res, next) {

    const query = req.query
    degreeCourseApplicationService.getDGApp(query, function (err, results) {
        if (err) {
            res.status(400).json({ error: "There was an error while getting all applications." })
        } else {
            res.status(200).json(Object.values(results))
        }
    })

})
/**
     *  Über Token holt er sich userID
     *  Passt die Info an AuthService
     *  Über AuthService überprüft er, ob er sich seine eigene UserID anschaut
     *  
     *  Mittels userID holt er sich die Bewerbungen, die spezifisch die UserID enthalten
     * -> Error, wenn:
     *      - es den userID nicht gibt
     * -> leere Antwort, wenn:
     *      - keine Bewerbung da ist
     */
router.get("/myApplications", authUtil.verifyUserToken, function (req, res, next) {

    const username = authService.getUserIDFromToken(req.headers["authorization"])
    // if (username.includes("admin")) {
    //     return res.status(400).json({ message: "Admin cannot have applications." })
    // }
    degreeCourseApplicationService.getUserDGApp(username, function (err, results) {
        if (err) {
            res.status(400).json({ error: "There was an error while finding your applications." })
        } else {
            res.status(200).json(Object.values(results))
        }
    })
})

router.get("/:id", authUtil.verifyToken, function (req, res, next) {
    const id = req.params.id
    degreeCourseApplicationService.getOneDGApp(id, function (err, result) {
        if (err) {
            res.status(400).json({ error: "Did not find application." })
        } else {
            res.status(200).send(result)
        }
    })
})

router.post("/", authUtil.verifyUserToken, function (req, res, next) {
    const username = authService.getUserIDFromToken(req.headers["authorization"])
    const body = req.body
    degreeCourseApplicationService.createDGApp(username, body, function (err, result) {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(201).json(result)
        }
    })
})

router.put("/:id", authUtil.verifyToken, function (req, res, next) {
    const id = req.params.id
    const updateInfo = req.body
    degreeCourseApplicationService.updateDGApp(id, updateInfo, function (err, result) {
        if (err) {
            res.status(400).json({ error: "There was an error while updating." })
        } else {
            res.status(200).json(result)
        }
    })


})

router.delete("/:id", authUtil.verifyToken, function (req, res, next) {

    const id = req.params.id
    degreeCourseApplicationService.deleteDGApp(id, function (err, result) {
        if (err) {
            res.status(400).json({ error: "There was an error while deleting." })
        } else {
            res.status(204).json()
        }
    })

})

module.exports = router