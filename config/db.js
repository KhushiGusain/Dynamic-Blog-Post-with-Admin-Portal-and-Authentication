import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection successful!");
    }
    catch(err){
        console.log("MongoDB connection failed!");
        process.exit(1);
    }
};

export default connectDb;
