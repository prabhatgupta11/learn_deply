const express=require("express")
const {NotesModel}=require("./model/notes.model")

const noteRouter=express.Router();


noteRouter.get("/",async(req,res)=>{
    const notes=await NotesModel.find()
    res.send("notes")
})


noteRouter.post("/createnote",async(req,res)=>{
    const notedetails=req.body
   const note=  new NotesModel(notedetails)
   await  note.save()
   res.send({"msg":"note created"})
})

noteRouter.delete("/deletenote/:id",async(req,res)=>{
    const noteID=req.params.id
    await NotesModel.findByIdAndDelete({_id:noteID})

    res.send({"msg":`note with id ${noteid} has been deleted`})
})

noteRouter.patch("/updatenote/:id",async(req,res)=>{
    const noteID=req.params.id
    await NotesModel.findByIdAndUpdate({_id:noteID})

    res.send({"msg":`note with id ${noteid} has been updated`})
})

module.exports={
    noteRouter
}

