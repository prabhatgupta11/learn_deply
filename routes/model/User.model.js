const mongoose=require("mongoose")


const userschema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})

const UserModel=mongoose.model("prabhat",userschema)

module.exports={
    UserModel
}