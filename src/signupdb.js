const mongoose=require("mongoose")
const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }
    
})


const LogInCollection=new mongoose.model('LogInCollection',logInSchema)
module.exports=LogInCollection
