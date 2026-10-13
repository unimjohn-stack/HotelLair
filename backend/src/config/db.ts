import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGO_URI;
    if(!mongoURI){
        throw new Error("MONGO_URI is missing from env variables");
    }
    await mongoose.connect(mongoURI);
    console.log("Mongo Connected successfully");
}

export default connectDB;