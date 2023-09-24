const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
    
    id:{
        type:String,
        required:true,
    
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    count:{
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    }

    
})


const cartCollection=new mongoose.model('cartCollection',cartSchema)
module.exports=cartCollection