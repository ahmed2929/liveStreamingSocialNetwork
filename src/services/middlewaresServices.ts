import multer from 'multer';
import {storage} from '../helper/multer';
import {checkImage} from '../helper/multer';


export  const upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        checkImage(file,cb)
    }
})
