const mongoose=require("mongoose")

const paymentSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    count:{
        type:String,
        required:true,
    },
   
    total:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    transid:{
        type:String,
        required:true,
        unique:true
    }
   
})

const paymentCollection=new mongoose.model('paymentCollection',paymentSchema)
module.exports=paymentCollection