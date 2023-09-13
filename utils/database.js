import { ReturnDocument } from "mongodb";
import mongoose, { mongo } from "mongoose";
import PreviousMap from "postcss/lib/previous-map";
let isConnected = false // OBSERVE THE STATUS OF THE CONNECTION 



export const connectToDB = async () => { 
    mongoose.set('strictQuery', true )
    if(isConnected)
    {
        console.log("MONGODB IS ALREADY CONNECTED")
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt-sharing",
            useNewUrlParser : true, 
            useUnifiedTopology : true
        })
        isConnected = true 
        console.log("MONGO DB IS SUCCESSFULLY CONNECTED ")
    } catch (error) {
        console.log(error)
    }
}