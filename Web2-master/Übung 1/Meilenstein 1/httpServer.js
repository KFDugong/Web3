/**
 * Kelvin Zihang Kuang
 * s85812@bht-berlin.de
 * 925597
 */

// NPM Modulimports
const express = require("express");
const bodyParser = require("body-parser")
// Interne Modulimports
const database = require("./database/db")
const testRoutes = require("./endpoints/test/TestRoutes")
const publicUserRoutes = require("./endpoints/publicUsers/UserRoutes")
// const userRoutes = require("./endpoints/users/UserRoutes")
const degreeCourseRoutes = require("./endpoints/degreeCourse/degreeCourseRoutes")

// Express App Usage
const app = express();
app.use(bodyParser.json())

// Datenbank starten
database.initDB(function (err, db) {
    if (db) {
        console.log("Connection to database successful.")
    } else {
        console.error("Connection to database failed.")
    }
})

// Adding Routes
app.use("/", testRoutes);
app.use("/api/publicUsers", publicUserRoutes)
// app.use("/api/users", userRoutes)
app.use("/api/degreeCourses" , degreeCourseRoutes)

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

/**
 * Port 8080 ruft auf meinen Rechner Nginx auf. Ich habe bereits Nginx deinstalliert und entfernt (vermutlich nicht erfolgreich), dennoch wird die Willkommensseite von Nginx mir angezeigt.
 */

// App Start
const port = 80;
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

