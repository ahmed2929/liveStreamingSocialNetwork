
import express, { NextFunction } from 'express'
import UserGeneralServices from '../../services/UserGeneralServices'
import AuthHelper from '../../helper/Auth'
import Response from '../../helper/response'
 const Router=express.Router();


Router.get('/GetUsers',async(req:any,res:any,next:NextFunction)=>{

/*move it to spirt file it make sure that req is authrized*/
const result:any =await AuthHelper.isAuhrized(req,res,next);
if(result=='0'){
Response.Unauthorized(res)
}else if (result=='-1'){
Response.CustomResponse(res,500,"an error ocured")
}else{
    console.debug("result " , result)
    req.userID=result.userId
    return next()
}


},async(req:any,res:any,next:any)=>{
    console.debug("userID is ", req.userID)
    let users=await UserGeneralServices.getUsers(req.query.ID)
    if(users=='-1'){
        Response.NotFound(res)
    }else{

        Response.Ok(res,'ok',{users});

    }
       
    
    
    
    
    });
    
    
    
    
    
    
    
    
















export default Router;
