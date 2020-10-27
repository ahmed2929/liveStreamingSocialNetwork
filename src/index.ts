import express,{Application,Request,Response,NextFunction} from 'express';

import mongoose from 'mongoose'
import {init} from './socketSetting'
import meddleware from './meddleware'
var app:Application =express();
mongoose.connect('mongodb+srv://AK:a01129292532@cluster0.5mhih.mongodb.net/Virta?retryWrites=true&w=majority',({ useNewUrlParser: true,useUnifiedTopology: true }),()=>{
    console.debug('DB connected')
    const server=app.listen(8000);
    init(server)
    console.debug('server is up')



    
})
app =meddleware(app);








