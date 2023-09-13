import { Schema, model, models  } from "mongoose";
// import { useEffect } from "react";

const userSchema = new Schema({
    email : {
        type : String,
        unique : [true,"User Already Exists !!"],
        required : [true,"Email Required !! "],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, should contain 8-20 alphanumeric letters and be unique!"]
    },
    image : {
        type : string,
    }
})


const User = models.User  || model("User",userSchema)
export default  User 