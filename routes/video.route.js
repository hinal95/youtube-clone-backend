import express from 'express'
import authenticate from '../middleware/auth.js'
import { addComment, createVideos, deleteComment, deleteVideo, editComment, filterByCategory, getAllVideos, getVideoById, searchVideos } from '../controllers/video.controller.js'

export function videoRoute(app){
    app.post('/api/video',authenticate,createVideos);
    app.get('/api/video',getAllVideos);
    app.get('/api/video/:videoId',getVideoById);
    app.delete('/api/video/:videoId',authenticate,deleteVideo)
    // comments
    app.post('/api/video/:videoId/comment', addComment);
    app.put('/api/video/:videoId/comment/:commentId', editComment);
    app.delete('/api/video/:videoId/comment/:commentId', deleteComment);

    app.get('/api/video/search', searchVideos);
    app.get('/api/video/category/:categoryName', filterByCategory);
}