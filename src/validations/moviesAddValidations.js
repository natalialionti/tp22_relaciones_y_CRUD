const {check} = require("express-validator");

module.exports = [
    check(title).notEmpty().withMessage("Debe ingresar un título")
]