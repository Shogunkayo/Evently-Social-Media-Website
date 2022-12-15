import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageRoomSchema = new Schema ({
    _id_sender: {
        type: ObjectId,
        required: [true, "Sender id required"]
    },
    
    user_name_sender: {
        type: String,
        required: [true, "Sender name required"]
    },
    
    _id_reciever: {
        type: ObjectId,
        required: [true, "Reciever id required"]
    },

    user_name_reciever: {
        type: String,
        required: [true, "Reciever name required"]
    },

    messages_sent: {
        type: Array,
        required: [true, "Messages sent is required"]
   },

   messages_recieved: {
        type: Array,
        required: [true, "Messages recieved is required"]
   }
})

const MessageRoom = mongoose.model('message', messageRoomSchema)
export default MessageRoom