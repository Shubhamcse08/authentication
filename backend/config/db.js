
import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB Connected");
    } catch(error){
        console.error("DB Connection Failed", error);
        process.exit(1);
    }
}

export default connectDB;