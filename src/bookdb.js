const mongoose=require("mongoose")
const BookSchema=new mongoose.Schema({
    
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    image:String
    
})


const bookCollection=new mongoose.model('bookCollection',BookSchema)
module.exports=bookCollection
