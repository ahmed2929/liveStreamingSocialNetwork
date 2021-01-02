import DB from '../helper/DB'
import Auth from '../helper/Auth'
import response from '../helper/response'
import { Document, Mongoose } from 'mongoose'
import { Schema } from 'mongoose'






export default class UserGeneralServices extends DB {


    /**
     * status -1 userNotFound and id is provided
     * return all users if no id
     * 
     */


    static async getUsers(ID?: Schema.Types.ObjectId) {
        if (!ID) {
            const Users: any = await this.getAllUsers()
            return Users
        }
        const user = await this.findById(ID);
        if (!user) {

            return '-1'
        }

        return user


    }

    static async editProfile(ID: Schema.Types.ObjectId, fName: string, lName: string, photo: string) {
        const result = await this.editProfileDB(ID, fName, lName, photo);
        if (result === -1) {
            return -1
        }
        return { status: 1, user: result }



    }
    static async createPost(ID: Schema.Types.ObjectId, description: string, photo: string) {
        const result = await this.createPostDB(ID, description, photo);
        if (!result) {
            return -1
        }
        return { status: 1, Post: result }



    }

    static async createComment(userID: Schema.Types.ObjectId,postID: Schema.Types.ObjectId, text: string) {

        const result = await this.createCommentDB(userID,postID, text);
        if (!result) {
            return -1
        }
        return { status: 1, Post: result }



    }
    static async createLike(userID: Schema.Types.ObjectId,postID: Schema.Types.ObjectId) {

        const result = await this.createLikeDB(userID,postID,);

        if (!result) {
            return -1
        }
        if (result===-2){
            return-2
        }
        console.log('asdasdasdasdsa');

        return { status: 1, Post: result }



    }






}