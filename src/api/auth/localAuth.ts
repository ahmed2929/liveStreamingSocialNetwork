
import express from 'express'
import async from '../../events/HandleSocketConnection/handleEvents';
import {UserAuthServices} from '../../services/UserAuthService'
import Response from '../../helper/response'
 const Router=express.Router();

Router.put('/singup',async(req:any,res:any,next:any)=>{
const {email,Fname,Lname,password,photo}=req.body
console.debug('api run')
const Data=await UserAuthServices.sinup(email,Fname,Lname,password,photo);

    if(Data===-1){
        Response.BadRequest(res,'email already exist');
    }


    Response.Created(res,'user created',Data);




});




Router.post('/login',async(req:any,res:any,next:any)=>{
    const {email,Fname,Lname,password,photo}=req.body
    console.debug('api run')
    const loginRes=await UserAuthServices.login(email,password);
    
        if(loginRes===-1){
            Response.BadRequest(res,'email not found');
        }else if(loginRes==0){
            Response.BadRequest(res,'password doesnt match');
        }
    
        Response.Ok(res,'ok',{token:loginRes});
    
    
    
    
    });
    
    
    
    
    
    
    
    
















export default Router;
