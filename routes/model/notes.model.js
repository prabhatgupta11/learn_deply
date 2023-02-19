const mongoose=require("mongoose")


const noteschema=mongoose.Schema({
    title:String,
    body:String,
    user:String
   
})

const NotesModel=mongoose.model("note",noteschema)

module.exports={
    NotesModel
}