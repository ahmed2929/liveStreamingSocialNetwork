
import bycript from 'bcrypt'
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
 
     async Decodejwt(token:string){
 
       return  jwt.verify(token,'ak');
 
     }
 
 }