const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { isEmail } = require("validator")

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, "UserID is required."],
        unique: [true, "This userID already exists."]
    },
    firstName: {
        type: String,
        required: [true, "Your first name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Your last name is required."]
    },
    isAdministrator: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "A password is required."],
        // minlength: [6, "Password must be 6 characters long"]
    },
    // email: {
    //     type: String,
    //     unique: [true, "This email address is already registered"],
    //     required: [true, "Please enter an email address"]
    // }
    
})

// Pre-Methode wird aufgerufen, bevor der User in der Datenban gespeichert wird
UserSchema.pre("save", async function (next) {
    /**
     * Passwortverschlüsselung mittles Salt:
     * 1. Salt generieren
     * 2. Salt ans Passwort anhängen
     * 3. Userpasswort Hashen (Schritt 2&3 können in einer Zeile stehen)
     */
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// Passwortvalidierung - Methode vom First-Steps Video

// UserSchema.methods.passwordValidation = function (inputPassword, next) {
//     bcrypt.compare(inputPassword, this.password, function (error, isMatch) {
//         if (error) {
//             next(error)
//         } else {
//             next(null, isMatch)
//         }
//     })
// }

const User = mongoose.model("User", UserSchema);

module.exports = User;