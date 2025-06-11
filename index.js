import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';

import { userRoute } from './routes/user.route.js';
import { channelRoute } from './routes/channel.route.js';
import { videoRoute } from './routes/video.route.js';


const app = express();
app.use(cors({ origin: 'https://youtube-clone-26rh.vercel.app',
     credentials: true }));
dotenv.config();
app.use(express.json());
app.use('/api', userRoute);
channelRoute(app);
videoRoute(app)

mongoose.connect("mongodb+srv://hinalnagar95:rYK44LzK1IUiCeKZ@cluster0.nxvqm2w.mongodb.net/")
.then(()=>{
    console.log("DATABSE IS CONNECTED")
})
.catch((err)=>{
    console.log("DATABASE IS NOT CONNECTED",err)
})



app.get('/', (req, res) => {
    console.log("welcome to route");
    res.send("Welcome to API");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ${PORT}`)
})


// hinalnagar95
// rYK44LzK1IUiCeKZ
// mongodb+srv://hinalnagar95:rYK44LzK1IUiCeKZ@cluster0.nxvqm2w.mongodb.net/
// mongodb+srv://hinalnagar95:rYK44LzK1IUiCeKZ@cluster0.nxvqm2w.mongodb.net/