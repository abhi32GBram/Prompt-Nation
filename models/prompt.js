import mongoose ,{Schema,models,model} from "mongoose";

const promptSchema = new Schema({
    creator: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    prompt : {
        type: String,
        require: [true,'Prompt is Required'],
    },
    tag:{
        type:String,
        required:[true,'Tag is Required']

    }
})

const Prompt = model.Prompt || model('Prompt',promptSchema)

export default Prompt