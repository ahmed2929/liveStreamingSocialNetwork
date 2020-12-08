import express,{Application,Request,Response,NextFunction} from 'express';
import  {config} from "dotenv"
import mongoose from 'mongoose'
import {init} from './socketSetting'
import meddleware from './meddleware'
var app:Application =express();
//config();
require('dotenv').config();
console.debug(process.env.PORT)
//app.use(dotenv.config());
mongoose.connect('mongodb+srv://AK:a01129292532@cluster0.5mhih.mongodb.net/Virta?retryWrites=true&w=majority',({ useNewUrlParser: true,useUnifiedTopology: true }),()=>{
    console.debug('DB connected')
    console.debug("port is ",process.env.PORT)
    const server=app.listen(process.env.PORT||8080);
    init(server)
    console.debug('server is up')



    
})
app =meddleware(app);








