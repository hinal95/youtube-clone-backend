

import video from "../models/video.model.js";
import { v4 as uuidv4 } from 'uuid';



export async function createVideos(req,res){
    try{
       const videos = await video.create(req.body)
       res.status(201).json(videos)
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export async function getAllVideos(req, res) {
  try {
    const videos = await video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getVideoById(req, res) {
  try {
    const videos = await video.findOne({ videoId: req.params.id });
    if (!videos) return res.status(404).json({ message: 'Video not found' });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteVideo(req, res) {
  try {
    const video = await video.findByIdAndDelete(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// addcomments.....

export async function addComment(req,res){
    try{
       const {videoId } = req.params;
       const {userId, text } = req.body;
      const videoDoc = await video.findOne({ videoId });
       if(!videoDoc){
         return res.status(404).json({message:"video not found"})
       }
       const newComment = {
          commentId: uuidv4(),
          userId,
          username, 
          text,
          timestamp: new Date(),
};
          videoDoc.comments.push(newComment);
          await videoDoc.save();
          res.status(201).json(newComment)
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

export async function deleteComment(req,res){
    try{
    const {videoId, commnetId} = req.params;
    const videoDoc  = await video.findOne({videoId})
    if (!videoDoc) {
        return res.status(404).json({ message: "video not found" });
    }
    videoDoc.comments = videoDoc.comments.filter((c)=>c.commentId !== commentId)
    await videoDoc.save();
    res.json({ message: 'Comment deleted' });
}
catch(err){
   return res.status(500).json({message:err.message}) 
}
}

export async function editComment(req, res) {
  try {
    const { videoId, commentId } = req.params;
    const { text } = req.body;

    const videoDoc = await video.findOne({ videoId });
    if (!videoDoc) return res.status(404).json({ message: 'Video not found' });

    const comment = videoDoc.comments.find(c => c.commentId === commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.text = text;
    await videoDoc.save();

    res.json({ message: 'Comment updated', comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// search

export async function searchVideos(req, res) {
  const { q } = req.query;
  try {
    const videos = await video.find({
      title: { $regex: q, $options: 'i' }
    });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// categoryName

export async function filterByCategory(req, res) {
  const { categoryName } = req.params;
  try {
    const videos = await video.find({ category: categoryName });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
