const { body, param } = require("express-validator");

const middlewareBody=[
    body("first_name").trim().notEmpty().withMessage("يجب أن يحتوي الاسم الأول على قيمة").isAlpha().withMessage("أدخل اسمًا صالحًا"),
    body("last_name").trim().notEmpty().withMessage("يجب أن يحتوي الاسم الأخير على قيمة").isAlpha().withMessage("أدخل اسمًا صالحًا"),
    body("phone").trim().notEmpty().withMessage("يجب أن يحتوي رقم الهاتف على قيمة"),
    body("email").trim().notEmpty().withMessage("يجب أن يحتوي البريد الإلكتروني على قيمة").isEmail().withMessage("أدخل بريدًا إلكترونيًا صالحًا"),
    body("password").trim().notEmpty().withMessage("يجب أن تحتوي كلمة المرور على قيمة"),
    body("role").trim().notEmpty().withMessage("يجب أن يحتوي الدور على قيمة").toLowerCase().isIn(['user', 'admin']).withMessage("يجب أن يكون الدور إما 'user' أو 'admin'")
]
module.exports={
    middlewareBody
}
