import multer from 'multer';
import path from 'path';
import fs from'fs';
//put the distination file for the uploaded file + the file name
export  var storage:any =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    
    
    
    }
    
    
    
    })   
    //check the image if its real image using its extinsion
   export var checkImage=function(file:any,cb:any){


        var ext:any=path.extname(file.originalname);
        ext=ext.toLowerCase();
        if(ext==='.png'||ext==='.jpg'||ext==='.jpeg'||ext==='.JPG'){
            cb(null,true)
        }else{
            cb('not an image',false)
        }
        
        
        }
    