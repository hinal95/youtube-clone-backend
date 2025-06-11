import channel from "../models/channel.model.js";

export async function createChannel(req,res){
    try{
        const { channelName, description, channelBanner } = req.body;
        const owner = req.user.id;
        const newChannel = await channel.create({
            channelName,
            description,
            channelBanner,
            owner,
        })

        res.status(201).json(newChannel)
    }
    catch(err){
       return  res.status(500).json({ message: err.message });
    }
}

export async function getAllChannel(req,res){
    try{
        const channels = await channel.find().populate('owner', 'username');
         res.json(channels);
    }
    catch(err){
        return    res.status(500).json({ message: err.message });
    }
}
export async function getChannelById(req,res){
 try{
  const channels = await channel.findById(req.params.channelId).populate('videos').populate('owner','username');
  if (!channels) {
    return res.status(404).json({ message: "Channel not found" });
  }
  res.json(channels);
 }
 catch(err){
     return res.status(500).json({ message: err.message });
 }
}

export async function UpdateChannel(req,res){
 try{
   const updated = await channel.findByIdAndUpdate(req.params.channelId, req.body, { new: true });
    res.json(updated);
 }
 catch(err){
     return res.status(500).json({ message: err.message });
 }
}

export async function deleteChannel(req, res) {
  try {
    await channel.findByIdAndDelete(req.params.channelId);
    res.json({ message: "Channel deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}