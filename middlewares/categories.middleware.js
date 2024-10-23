const { body, param } = require("express-validator");

const middlewareBody=[
    body("category_name").trim().notEmpty().withMessage("يجب أن يحتوي اسم التصنيف على قيمة")
]
module.exports={
    middlewareBody
}
