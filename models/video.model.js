import mongoose from "mongoose";
import { v4 as uuid } from 'uuid';

const videoSchema = new mongoose.Schema({
  videoId:{
        type:String,
        require:true,
        unique:true,
        default:uuid
    },
  title: { 
        type: String, 
        required: true },
  thumbnailUrl: String,
  category: { type: String },
  description: String,
  channelId: 
  { type: String, 
    required: true },
  uploader: 
  { type: String, 
    required: true }, // userId
  views: 
  { type: Number, 
    default: 0 },
  likes: 
  { type: Number, 
    default: 0 },
  dislikes: 
  { type: Number, 
    default: 0 },
  uploadDate: 
  { type: Date, 
    default: Date.now },
    category: 
    { type: String, 
      required: true },

    comments: [
    {
      _id:{ type: mongoose.Schema.Types.ObjectId, auto: true },
      commentId: String,
      userId: String,
      text: String,
      timestamp: Date,
    },
  ],
});


const video = mongoose.model('video',videoSchema);
export default video;