import express from 'express'
import authenticate from '../middleware/auth.js'
import { createChannel, deleteChannel, getAllChannel, getChannelById, UpdateChannel } from '../controllers/channel.controller.js'
export function channelRoute(app){
  app.post('/api/channel',authenticate,createChannel);
  app.get('/api/channel',getAllChannel)
  app.get('/api/channel/:channelId',getChannelById);
  app.put('/api/channel/:channelId',UpdateChannel);
  app.delete('/api/channel/:channelId', authenticate, deleteChannel);
}