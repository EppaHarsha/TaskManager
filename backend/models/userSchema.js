const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    token:{
        type:String
    },
    
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
})

const User = new mongoose.model("User",userSchema);

module.exports=User;