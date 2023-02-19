const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const jwt=require("jsonwebtoken")
const {noteRouter}=require("./routes/notes.routes")
const {authenticate}=require("./middleware/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.use(cors())

app.use(express.json())

app.get("/home",(req,res)=>{
    res.send("this is home page")
})

app.use("/users",userRouter)
app.use("/notes",noteRouter)
app.use(authenticate)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to database")
    }catch(err){
        console.log(err.message)
    }
   
})