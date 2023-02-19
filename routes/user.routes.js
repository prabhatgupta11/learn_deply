const express=require("express")
const {UserModel}=require("./model/User.model")
const userRouter=express.Router();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

 userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass , 5 , async (err,hash)=>{
            if(err)
            {
                res.send({"msg":"something went wrong","error":err.message})
            }
            else
            {
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"new user has been register"})
            }
        });
    }catch(err){
        res.send({"msg":"something went wrong while registring","error":err.message})
    }
 })


// userRouter.post("/register",async(req,res)=>{
//     const {name,email,pass}=req.body;
//     try{ 
//         bcrypt.hash(pass,5,async(err,bcrypt.hash))
//        
//         await user.save();
//         res.send({"msg":"new user has been register"})
//     }catch(err){
//         console.log({"msg":"something went wrong while registring","error":err.message})
//     }
     
// })

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=(req.body) 
    // const  token=jwt.sign({course:"backend"},"masai")
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
              bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result )
                {
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"login sucessfull","token":token  })
                }
                else{
                    res.send({"msg":"wrong credential"})
                }
              });
            // let  token=jwt.sign({course:"backend"},"masai")
            //  res.send({"msg":"login sucessfull","token":token  })
        }
        else{
            res.send("something went wrong while login")
        }
    }catch(err){
        res.send(err)
        console.log("something wrong in login section")
    }
     
})

module.exports={
    userRouter
 }

