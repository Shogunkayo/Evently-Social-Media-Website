import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    fdback_name:{
        type: String,
        required: [true, 'Name field is required']
    },
    fdback_email:{
        type: String
    },
    fdback_message:{
        type: String,
        required: [true, 'Message field is required']
    },
    fdback_time:{
        type: Date
    }
})

const Feedback = mongoose.model('feedback', FeedbackSchema);

export default Feedback