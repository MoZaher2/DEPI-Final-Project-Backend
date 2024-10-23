const { body, param } = require("express-validator");

const middlewareBody=[
    body("name").trim().notEmpty().withMessage("يجب أن يحتوي الاسم على قيمة"),
    body("url").trim().notEmpty().withMessage("يجب أن يحتوي الرابط على قيمة"),
]
module.exports={
    middlewareBody
}
