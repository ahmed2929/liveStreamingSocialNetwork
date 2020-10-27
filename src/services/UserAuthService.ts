import DB from '../helper/DB'
import Auth from '../helper/Auth'
import response from '../helper/response'
import {Document} from 'mongoose'







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
        const token=this.GenerateJTW(user._id)
        return token


    }







}