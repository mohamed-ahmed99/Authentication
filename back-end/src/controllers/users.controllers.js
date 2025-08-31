
import Users from "../modules/users.schema.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import transporter from '../utils/email.service.js'

dotenv.config()


//////////////// register 
export const register = async (req, res) => {
    try{
        const isFound = await Users.findOne({email:req.body.email})
        if(isFound) return res.status(400).json({message:"this email is connicting with another account"})

        req.body.password = await bcrypt.hash(req.body.password, 10) // hash password
        const verifyCode = Math.floor(10000 + Math.random() * 90000).toString()

        const newUser = await Users.create({...req.body, verifyCode:verifyCode})

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: req.body.email,
            subject:"Verify Your Account",
            html:`
                <h2>hello ${newUser.firstName},</h2>
                <p>thanks for registring in our website</p>
                <p>This's Your Verification Code: <span style="color:blue; font-size:22px">${verifyCode}</span> </p>
                <p>سينتهي خلال 10 دقائق.</p>
                <br/>
                <p>تحياتي,<br/>فريق الدعم</p>
            `
        })
        
        
        res.status(201).json({ message: "User registered, check your email" });
    }
    catch(error){
        return res.status(500).send({message:String(error)})
    }
}


////////  verify new user
export const verifyEmail = async (req,res) => {

    try{
        const {email, code} = req.body
        if(!email, !code) return res.status(401).send({message:"email && code are required"})

        const user = await Users.findOne({email:email})
        if(!user) return res.status(404).send({message:"NOT FOUND USER"})

        if(user.verifyCode != code) return res.status(401).json({message:"Invalid verification code"})
        if(user.verifyExpires < Date.now()) return res.status(401).json({message:"Code expired, register again"})

        const token = jwt.sign({_id:user._id, email:user.email}, process.env.JWT_SECRET)
        
        user.isVerified = true
        user.verifyCode = undefined
        user.verifyExpires = undefined
        user.tokens.unshift({token:token, date:Date.now()})
        await user.save()


        res.cookie("authXtoken", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            path:"/"
        })

        return res.status(200).json({ message: "Email verified successfully"});
    }

    catch(error){
        return res.status(500).send({message:String(error)})
    }   
}


////// login
export const login = async (req,res) => {
    try{
        const {email, password} = req.body
        const user = await Users.findOne({email:email})
        if(!user) return res.status(404).send({message:"user not found"}) // check if user is existing or not

        // check password
        if (!user.checkPassword(password)) return res.status(401).send({message:"incorrect password"}) 
        
        // token
        const token = jwt.sign({_id:user._id, email:user.email}, process.env.JWT_SECRET)
        user.tokens.unshift({token:token, date:Date.now()})
        await user.save()

        res.cookie("authXtoken", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            path:"/"
        })
        
        return res.status(200).send({message:'successful login'})
    }
    catch(error){
        return res.status(500).send({message:String(error)})
    }
}

