const express=require("express")
const router=express.Router()
const usersController=require("../controllers/users.controller")
const usersMiddleware=require("../middlewares/users.middleware")
const uploadImageForLocationMiddleware=require('../middlewares/uploadImageForLocation.middleware')
const tokenMiddleware=require('../middlewares/token.middleware')
const multer  = require('multer')



const diskStorage=multer.diskStorage({
        destination:function(req,file,cb){
                cb(null,'uploads')
        },
        filename:function (req,file,cb){
                const ext=file.mimetype.split('/')[1];
                const fileName=`img-${Date.now()}.${ext}`;
                cb(null,fileName)
        }
})


const upload = multer({ storage: diskStorage,
        fileFilter:function (req,file,cb){
                const fileType=file.mimetype.split("/")[0]
                if(fileType=="image")return cb(null,true)
                const error = new Error('FILE TYPE WRONG');
                error.status = 400;
                cb(error, false);
        }
})

router.route("/register")
        .post(upload.single('image'),usersMiddleware.middlewareBody,usersController.register)
router.route("/login")
        .post(multer().none(),usersController.login)
router.route("/getAuthStatus")
        .get(usersController.getAuth)
router.route("/profile")
        .patch(tokenMiddleware,uploadImageForLocationMiddleware,usersController.updateProfile)

module.exports=router
