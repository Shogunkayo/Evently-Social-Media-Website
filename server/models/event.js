import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User',
    },

    user_name: {
        type: String,
        required: true
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

    event_interested: {
        type: Array,
        required: [true, 'Interested field is required']
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

    event_img: {
        type: String,
        required: [true, 'Image field is required']
    },

    event_comments: {
        type: Array,
        required: [true, 'Comment field is require']
    }
    
})

const Event = mongoose.model('event', EventSchema);

export default Event