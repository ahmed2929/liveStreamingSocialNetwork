
import express from 'express'
import async from '../../events/HandleSocketConnection/handleEvents';
import {UserAuthServices} from '../../services/UserAuthService'
import Response from '../../helper/response'
import {upload} from '../../services/middlewaresServices';
import {cloud} from '../../helper/cloudinary';
 const Router=express.Router();

Router.put('/singup',upload.single('photo'),cloud,async(req:any,res:any,next:any)=>{
const {email,Fname,Lname,password}=req.body
const photo=req.result.url
//console.debug('api run req.result is ',req.result)
const Data=await UserAuthServices.sinup(email,Fname,Lname,password,photo);

    if(Data===-1){
        Response.BadRequest(res,'email already exist');
    }


    Response.Created(res,'user created',Data);
    console.debug("photo is ",photo)



});




Router.post('/login',async(req:any,res:any,next:any)=>{
    const {email,password}=req.body
    console.debug('api run password is ',password)
    const loginRes=await UserAuthServices.login(email,password);
    
        if(loginRes===-1){
            Response.BadRequest(res,'email not found');
        }else if(loginRes==0){
            Response.BadRequest(res,'password doesnt match');
        }
    
        Response.Ok(res,'ok',{token:loginRes});
    
    
    
    
    });
    
    
    
    
    
    
    
    
















export default Router;
