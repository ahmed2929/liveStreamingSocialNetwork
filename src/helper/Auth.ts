
import bycript from 'bcrypt'
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export  default class AuthHelper{
    static async CreateHashedPassword(password:string){
 
        return await bycript.hash(password,12);
 
     }
 
    static async CompareHashedPassword(pass1:string,pass2:string){
 
         return await bycript.compare(pass1,pass2);
     }
 
     static GenerateJTW(UserID:string){
         return  jwt.sign(
             {
                UserID
             },
            'AK'
         );
     }
 
    static async Decodejwt(token:string){
 
       return  jwt.verify(token,'ak');
 
     }

    static async getToken(req:any){

        /**
         * get token from user request
         * return 0 if there is no token
         * return tokent if it exist 
         * 
         * 
         */

        const authHeader = req.get('Authorization');
        if(!authHeader){
            return '0'
                       
        }
        const token =req.get('Authorization').split(' ')[1];

        return token 


    }
    
    static async isAuhrized(req:Request,res:Response,next:NextFunction){
        /**
         * return 0 if user is not authorized
         * return userId if user is authorized
         * return -1 an error ocurred
         * 
         * 
         * 
         */
        const token : string=await this.getToken(req);

        if(token == '0'){
            return '0'
        }


        const UserId :any=await this.Decodejwt(token);

        if(!UserId){

            return '-1'
        }
        
        return UserId


    }
 
 }