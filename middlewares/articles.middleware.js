const { body, param } = require("express-validator");

const middlewareBody=[
    body("title").trim().notEmpty().withMessage("يجب أن يحتوي العنوان على قيمة"),
    body("meta_description").trim().notEmpty().withMessage("يجب أن يحتوي الوصف التعريفي على قيمة"),
    body("key_words").trim().notEmpty().withMessage("يجب أن تحتوي الكلمات المفتاحية على قيمة"),
    body("article_body").trim().notEmpty().withMessage("يجب أن يحتوي نص المقال على قيمة"),
    body("article_image").trim().notEmpty().withMessage("يجب أن تحتوي صورة المقال على قيمة"),
    body("article_url").trim().notEmpty().withMessage("يجب أن يحتوي رابط المقال على قيمة"),
    body("category_id").isMongoId().withMessage("يجب أن يكون معرف التصنيف صالحًا"),
    body("admin_id").isMongoId().withMessage("يجب أن يكون معرف المشرف صالحًا"),
]
module.exports={
    middlewareBody
}
