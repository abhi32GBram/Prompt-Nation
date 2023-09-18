import mongoose from "mongoose";

let isConnected = false; // OBSERVE THE STATUS OF THE CONNECTION

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("MONGODB IS ALREADY CONNECTED");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt-sharing",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log("MONGO DB IS SUCCESSFULLY CONNECTED");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        isConnected = false; // Set isConnected to false on error
        throw new Error("Failed to connect to MongoDB"); // Throw an error on failure
    }
};
