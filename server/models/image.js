import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'User field is required']
    },

    event_img: {
        data: Buffer,
        contentType: String
    }
})

const Image = mongoose.model('image', ImageSchema)

export default Image