import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const User = new mongoose.Schema({
    // personal
    firstName:String,
    lastName:String,
    age:Number,
    phoneNumber:String,
    address:String,

    // security
    email:{type:String, unique:true},
    password:String,
    tokens:{type: Array, default:[]},

    // check userEmail
    isVerified:{type:Boolean, default:false},
    verifyCode:String,
    verifyExpires:{type:Date, default: () => Date.now() + 1 * 60 * 1000},

    // user profile
    profilePhoto:String,
    backgroundPhoto:String,

    posts:[{
        content:String,
        postDate:{type: Date, default:Date.now},

        likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],

        comments:[{
            user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
            content:String,
            commpentDate:{type: Date, default:Date.now}
        }]
    }]
}, {timestamps:true})


// check password 
User.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// delete user after 10 minutes if user did't verify his email
User.index({ verifyExpires: 1 }, { expireAfterSeconds: 0 });

const Users = mongoose.model("Users", User)
export default Users

