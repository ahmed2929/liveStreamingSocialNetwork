
import express ,{Request,NextFunction} from 'express'
import async from '../../events/HandleSocketConnection/handleEvents';
import {UserAuthServices} from '../../services/UserAuthService'
import Response from '../../helper/response'
import {upload} from '../../services/middlewaresServices';
import {cloud} from '../../helper/cloudinary';
import AuthHelper from '../../helper/Auth';

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
    
    
    
    Router.post('/sendActivationCode',
    async(req:any,res:any,next:NextFunction)=>{

        /*move it to spirt file it make sure that req is authrized*/
        const result:any =await AuthHelper.isAuhrized(req,res,next);
        if(result=='0'){
        Response.Unauthorized(res)
        }else if (result=='-1'){
        Response.CustomResponse(res,500,"an error ocured")
        }else{
            console.debug("result " , result)
            req.userID=result.UserID
            return next()
        }
        
        
        }
    ,async(req:any,res:any,next:any)=>{
           const result:any= UserAuthServices.sendActivationCode(req.userID);

          
        if(result){
            Response.Ok(res,'ok');

        }else{
            Response.CustomResponse(res,500,"an error ocured")

        }
        
        
        
        
        });
        
        
        
    
    
    
        Router.post('/verfiyEmail',
        async(req:any,res:any,next:NextFunction)=>{
    
            /*move it to spirt file it make sure that req is authrized*/
            const result:any =await AuthHelper.isAuhrized(req,res,next);
            if(result=='0'){
            Response.Unauthorized(res)
            }else if (result=='-1'){
            Response.CustomResponse(res,500,"an error ocured")
            }else{
                console.debug("result " , result)
                req.userID=result.UserID
                return next()
            }
            
            
            }
        ,async(req:any,res:any,next:any)=>{
                const code=req.body.code.trim()
               const result:Boolean= await UserAuthServices.verfiyEamil(req.userID,code.trim());
    
              
            if(result){
                Response.Ok(res,'ok');
    
            }else{
                Response.BadRequest(res,"code is wrong or it is expired")
    
            }
            
            
            
            
            });
            
            
            
        















export default Router;
