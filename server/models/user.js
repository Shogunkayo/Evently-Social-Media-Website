import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_name:{
        type: String,
        required: true
    },
    user_password:{
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    user_followers:{
        type: Array,
        required: true
    },
    user_following:{
        type: Array,
        required: true
    },
    user_posts:{
        type: Array,
        required: true
    },
    user_interested:{
        type: Array,
        required: true
    },
    user_message_rooms:{
        type: Array,
        required: true
    },
    roles: {
        type: Array,
        required: true
    },
    user_bio: {
        type: String,
        required: true
    },
    user_img: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', UserSchema);

export default User