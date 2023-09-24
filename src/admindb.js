const mongoose=require("mongoose")
const AdminSchema=new mongoose.Schema({
    
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    
})


const AdminCollection=new mongoose.model('AdminCollection',AdminSchema)
module.exports=AdminCollection
