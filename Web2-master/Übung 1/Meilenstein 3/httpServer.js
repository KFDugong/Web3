/**
 * Kelvin Zihang Kuang
 * s85812@bht-berlin.de
 * 925597
 */

// NPM Modulimports
const express = require("express");
const bodyParser = require("body-parser")
const fs = require("fs")
const https = require("https")
const cors = require("cors")

// Datenbankmodul
const database = require("./database/db")
// Routenmodule
const testRoutes = require("./endpoints/test/TestRoutes")
const publicUserRoutes = require("./endpoints/users/PublicUserRoute")
const UserService = require("./endpoints/users/UserServices")
const userRoutes = require("./endpoints/users/UserRoutes")
const degreeCourseRoutes = require("./endpoints/degreeCourse/degreeCourseRoutes")
const authenticateRoute = require("./endpoints/authenticate/authenticateRoutes")
const degreeCourseApplicationRoutes = require("./endpoints/degreeCourseApplication/DegreeCourseApplicationRoute")

// Middleware
const key = fs.readFileSync('./certificates/key.pem')
const cert = fs.readFileSync('./certificates/cert.pem')
const app = express();
app.use("*", cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
})
app.use(bodyParser.json())

// Datenbank starten
database.initDB(function (err, db) {
    if (db) {
        UserService.createDefaultAdmin(function (err) {
            if (err) {
                console.log(err)
            }
        })
        console.log("Connection to database successful.")
        console.log("========================================================================================")
    } else {
        console.error("Connection to database failed.")
    }
})

// Adding Routes
app.use("/", testRoutes);
app.use("/api/publicUsers", publicUserRoutes)
app.use("/api/users", userRoutes)
app.use("/api/degreeCourses", degreeCourseRoutes)
app.use("/api/authenticate", authenticateRoute)
app.use("/api/degreeCourseApplications", degreeCourseApplicationRoutes)

/**
 * Serverseitige Error Handlers:
 * 
 *  1. Serverseitiger Fehler
 *  2. Userseitiger Fehler
 */
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something went wrong on our side. :( Sorry!")
})

app.use(function (err, req, res, next) {
    res.status(404).send("Sorry, we cannot find the URL. Please pass in a valid URL.")
})

const server = https.createServer({ key: key, cert: cert }, app);

// app.get('/', (req, res) => { res.send('this is an secure server') })

app.listen(8080, () => {
    console.log("Http app listening on port https://localhost/8080");
})

// App Start
const port = 443
server.listen(port, () => {
    console.log(`Example app listening on port https://localhost:${port}`)
    console.log(new Date().toISOString())
    console.log("========================================================================================")
})

// const portHTTP = 80
// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${portHTTP}`)
//     console.log(new Date().toISOString())
//     console.log("========================================================================================")
// })
