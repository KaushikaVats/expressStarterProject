const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:[true , "First name is required"],
         minlength: [5, "First name should be atleast 5 characters long"],
         lowercase : true,
         trim:true,
         maxlength: [20,"First name should be less than or equal to 20"]

    },
    lastName: {
        type: String,
        required:[true , "First name is required"],
         minlength: [5, "First name should be atleast 5 characters long"],
         lowercase : true,
         trim:true,
         maxlength: [20,"First name should be less than or equal to 20"]
    },
    mobileNumber:{
        type:String,
        trim:true,
        minlength:[10, "Phone number should be of minimum 10 digits"],
        maxlength: [10, "Phone number should be of minimum 10 digits"],
         unique:[true ,"Phone number is already in use "],
         required: [true, "Phone number is required"]
    },email :{
        type:String,
        trim:true,
        required:[true,"Email is required"],
        unique:[true , "Email  is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,"Password ir required"],
        minlength:[6,"Password should be of minimum 6 characters"]
    },
    role: {
        type: String,
        enum:["USER" , "ADMIN"],
        default: "USER"
    },
    address :{
        type : String
    }

},{
    timestamps:true
});

userSchema.pre('save' , async function(){
    const hashedPassword = await bcrypt.hash(this.password , 10);
    this.password = hashedPassword;
    })


const User = mongoose.model("User" , userSchema); //collection
module.exports = User;