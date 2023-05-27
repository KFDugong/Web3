const mongoose = require("mongoose")
const config = require("config")

/**
 * db.js from the first steps video. 
 * A lot of unanswered questions.
 * 
 * - Wie sucht sich mongoose die Collection genau aus?
 * - Kann es auch eine Collection in MongoDB erstellen?
 * - Wie habe ich Kontrolle über die Indizes -> Email unique property wurde in MongoDB gespeichert und ich musste es manuell entfernen. 
 * - Was sind Session Token und was machen die? Generiere ich die über MongoDB? Annahme: Authentication und Cookies, damit eine Webpage sich die Anbidnung zur Datenbank merkt.
 * - Was machen die property im json Objekt in der mongoose.connect- function?
 * - Parameter _db wird als [object Object] angezeigt. Ist es richtig so ?
 */

let _db
const connectionString = config.get("db.connectionString")

function initDB(callback){
    if(_db){
        if(callback){
            return callback(null, _db)
        } else {
            return _db
        }
    } else {
        mongoose.connect(connectionString,{useNewUrlParser:true, useUnifiedTopology: true, autoIndex: true})
        _db = mongoose.connection

        _db.on("error" , console.error.bind(console, "Connection error: "))
        _db.once("open", function(){
            console.log("Connected to database " + connectionString + "in db.js" + _db)
            callback(null, _db)
        })
    }
}

function close(){
    return _db
}

module.exports = {
    initDB,
    close
}