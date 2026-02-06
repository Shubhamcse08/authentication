
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user

export const registerUser = async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        // check existing user
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        // hash password
        const hashedPassword= await bcrypt.hash(password,10)

        // create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        return res.status(201).json({message:"User registerd successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
}

export const loginUser= async(req,res)=>{
    try {
        const {email,password}=req.body;

        // check user exits
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email"})
        }

        // compare password
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        // create token
        const token =jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}

        )

        return res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email: user.email,
            }
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error sorry"});
    }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};