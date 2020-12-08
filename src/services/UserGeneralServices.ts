import DB from '../helper/DB'
import Auth from '../helper/Auth'
import response from '../helper/response'
import {Document, Mongoose} from 'mongoose'
import {Schema} from 'mongoose'






export default class UserGeneralServices extends DB{


/**
 * status -1 userNotFound and id is provided
 * return all users if no id
 * 
 */


    static async getUsers(ID?:Schema.Types.ObjectId){
       if(!ID){
           const Users:any=await this.getAllUsers()
           return Users
       }
          const user=  await this.findById(ID);
          if(!user){
           
          return '-1'
          }
        
        return user


    }







}