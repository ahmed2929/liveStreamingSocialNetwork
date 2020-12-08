import DB from '../helper/DB'
import Auth from '../helper/Auth'
import response from '../helper/response'
import {Document, Schema} from 'mongoose'
import AuthHelper from '../helper/Auth'
import { NextFunction } from 'express'
import Response from '../helper/response'
import {genrateCode} from '../helper/general'
import {sendEmail} from '../helper/sendEmail'
import {sendActivationCode} from "../utilites/messages"


export class UserAuthServices extends DB{

    static async  sinup(Email:string,Fname:string,Lname:string,password:string,photo:string){
        console.debug('sinup run ')
    const cre=await this.CreateNewUser(Email,Fname,Lname,password,photo);
    if(cre===-1){
        return -1
    }
     console.debug('created user******',cre)
     const token=this.GenerateJTW(cre._id)
     console.debug('token',token)
     return {status:1,token:token}
        


    }

/**
 * status -1 email not exist 
 * status 0 password doesnt mach
 * status 1 login is sucess
 * 
 * 
 */


    static async login(Email:string ,password:string){
        var status:number;
          const user=  await this.findByEmail(Email);
          if(!user){
            status=-1
            return status
          }
          console.debug('user.pass ',user.password,'password ',password)
          const passMatch=await this.CompareHashedPassword(password,user.password);
          console.debug('passMatch',passMatch)
          if(!passMatch){
              status=0
              return status
          }
          console.debug("user is ",user)
        const token=this.GenerateJTW(user._id.toString())
        return token


    }
    static async resetpassword(oldPassword:string,newPassword:string,req:any,res:any,next:NextFunction)
    
    {
      
            

    } 

    

    static async  sendActivationCode(ID:Schema.Types.ObjectId){
        const code:String = genrateCode();
        const userEmail=await this.putCodeToUser(ID,code)
        console.debug("eamil is ",userEmail)

        if(userEmail){
           const result= await sendEmail(userEmail,'ActivationCode',sendActivationCode(code))
           console.debug("sendemail resu ",result)
           return true
        }else{
            return false

        


    }






    }


    static async  verfyEmail(ID:Schema.Types.ObjectId,code:String){
       const result= this.verfiyEamil(ID,code)

       if(result){
           return true
       }else{
           return false
       }



    }
}