const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    comment:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    ad_id:{type:mongoose.Schema.Types.ObjectId,ref:'Ads',default:null},
    article_id:{type:mongoose.Schema.Types.ObjectId,ref:'Articles',default:null},
    user_role:{type:String},
    
})  

module.exports=mongoose.model('Comments',commentSchema)