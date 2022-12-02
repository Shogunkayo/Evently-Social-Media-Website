import mongoose from "mongoose";
const Schema = mongoose.Schema;

var ImgSchema = new Schema({
    img: { data: Buffer, contentType: String}
}, {
    timestamps: true
});

const Image = mongoose.model('Img', ImgSchema);

export default Image