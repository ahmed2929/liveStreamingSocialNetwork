import UserModel from '../modles/user'
import {Schema} from 'mongoose'

import AuthHelper from './Auth'



export default class DbQueryHelpers extends AuthHelper{

   static async findByEmail(email:string){
        return await UserModel.findOne({ email: email });
    }
   
    getUserFollowersById(ID:Schema.Types.ObjectId){
        return UserModel.findById(ID).select('followers').populate('User')
    }
    getUserFollowingListById(ID:Schema.Types.ObjectId){
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
            photo
        }).save()

    }

    


    
    


}
