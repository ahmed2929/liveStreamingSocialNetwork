import multer from 'multer';
import path from'path';
import {upload} from '../services/middlewaresServices';
import cloudinary,{v2} from 'cloudinary';
import fs from 'fs';

v2.config({
    cloud_name: 'djvim89uw',
    api_key: '512955989234597',
    api_secret: 'vmr-YO5ApfWFcRAzYPbdOiALz2I'
});

export const cloud = async (req:any, res:any, next:any) => {
    if(req.file===undefined){
        req.result=''
        return next();
    }
   v2.uploader.upload(req.file.path,
        function (error:any, result:any) {
            if (error) {
                console.debug(error)
            }

                                    
            req.result=result
            console.debug('cloud link is',result)

            return next()

        }
    
   )}