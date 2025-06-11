import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    ChannelName:{
        type:String,
        require:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'user',
        require:true 
    },
    description:String,
    channelBanner: String,
    subscribers:{
        type:Number,
        default:0
    },
    videos:[{type:mongoose.Schema.Types.ObjectId, ref: 'video'},]
},{ timestamps: true })

const channel = mongoose.model('channel',channelSchema)
export default channel;