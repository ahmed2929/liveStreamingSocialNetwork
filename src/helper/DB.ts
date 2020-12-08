import UserModel from '../modles/user'
import {Schema} from 'mongoose'
import bycript from "crypto"
import AuthHelper from './Auth'



export default class DbQueryHelpers extends AuthHelper{

   static async findByEmail(email:string){
        return await UserModel.findOne({ email: email });
    }
   
    static async findById(ID:Schema.Types.ObjectId){
       // console.debug("user id is for find by id ",ID)
       const user:any =await UserModel.findById(ID);
      // console.debug("user is from finbyid",user)
       if(!user){
           return "-1"
       }
       return user
    }
    static async getAllUsers(page=1,itemPerPage=10){
        return await UserModel.find()
        .skip((page - 1) * itemPerPage)
        .limit(itemPerPage);
    }

   static async getUserFollowersById(ID:Schema.Types.ObjectId){
        return UserModel.findById(ID).select('followers').populate('User')
    }
   static async getUserFollowingListById(ID:Schema.Types.ObjectId){
        return UserModel.findById(ID).select('following').populate('User')
    }
    
    static async CreateNewUser(Email:string,Fname:string,Lname:string,password:string,photo:string){
        console.debug('create user works ')
        const emailExist=await this.findByEmail(Email);
        console.debug('emailExist',emailExist)
        if(emailExist!=undefined){
            return -1 // if email exists
        }
       var Hpassword= await this.CreateHashedPassword(password)
       console.debug('hased pass',Hpassword)
       return await new UserModel({
        email:Email,
        firstName:Fname,
        lastName:Lname,
         password:Hpassword,
            photo:photo
        }).save()

    }

    static async putCodeToUser(ID:Schema.Types.ObjectId,code:String,expire=3600000){
        const user=await this.findById(ID);
        if(user=="-1"){
            throw new Error("user not found")
        }
        user.EmailActiveCode=code
        user.codeExpireDate=Date.now()  + expire
      const saved=  await user.save()
      console.debug("saved is ",saved)
        return user.email

    }

    static async verfiyEamil(ID:Schema.Types.ObjectId,code:String){
        const user=await this.findById(ID);
        if(user=="-1"){

            throw new Error("user not found")
        }

        if(user.EmailActiveCode!=code){
            return false
        }

        
        if(user.codeExpireDate<=Date.now()){
    
            
            return false
        }
    
        user.emailVerfied=true;
        await user.save()
        return true


        
    }

    


    
    


}

