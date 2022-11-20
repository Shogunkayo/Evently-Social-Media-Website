import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'User field is required']
    },
    
    create_time: {
        type: Date,
        required: [true, 'Date field is required']
    },
    
    event_name: {
        type: String,
        required: [true, 'Name field is required']
    },
    
    event_desc: {
        type: String,
        required: [true, 'Desc field is required']
    },
    
    event_likes: {
        type: Number,
        required: [true, 'Likes field is required']
    },
    
    event_genre: {
        type: Array,
        required: [true, 'Genre field is required']
    },
    
    event_location: {
        type: String,
        required: [true, 'Location field is required']
    },
    
    event_date: {
        type: Date,
        required: [true, 'Event Date field is required']
    },
    event_duration: {
        type: String,
        required: [true, 'Duration field is required']
    },
    event_age: {
        type: String,
        required: [true, 'Age field is required']
    },
    
})

const Event = mongoose.model('event', EventSchema);

export default Event