import UserModel from '../modles/user'
import { Schema } from 'mongoose'
import bycript from "crypto"
import AuthHelper from './Auth'
import bcryptL from "bcrypt"
import PostModel from '../modles/post';
import CommentModel from '../modles/comment';


export default class DbQueryHelpers extends AuthHelper {

    static async findByEmail(email: string) {
        return await UserModel.findOne({ email: email });
    }

    static async findById(ID: Schema.Types.ObjectId) {
        console.debug("user id is for find by id ", ID)
        const user: any = await UserModel.findById(ID);
        console.debug("user is from finbyid", user)
        if (!user) {
            return "-1"
        }
        return user
    }
    static async getAllUsers(page = 1, itemPerPage = 10) {
        return await UserModel.find()
            .skip((page - 1) * itemPerPage)
            .limit(itemPerPage);
    }

    static async getUserFollowersById(ID: Schema.Types.ObjectId) {
        return UserModel.findById(ID).select('followers').populate('User')
    }
    static async getUserFollowingListById(ID: Schema.Types.ObjectId) {
        return UserModel.findById(ID).select('following').populate('User')
    }

    static async CreateNewUser(Email: string, Fname: string, Lname: string, password: string, photo: string) {
        console.debug('create user works ')
        const emailExist = await this.findByEmail(Email);
        console.debug('emailExist', emailExist)
        if (emailExist != undefined) {
            return -1 // if email exists
        }
        var Hpassword = await this.CreateHashedPassword(password)
        console.debug('hased pass', Hpassword)
        return await new UserModel({
            email: Email,
            firstName: Fname,
            lastName: Lname,
            password: Hpassword,
            photo: photo
        }).save()

    }

    static async putCodeToUser(ID: Schema.Types.ObjectId, code: String, expire = 3600000) {
        const user = await this.findById(ID);
        console.debug('userrrrr is', user)
        if (user == "-1") {
            throw new Error("user not found")
        }
        user.EmailActiveCode = code
        user.codeExpireDate = Date.now() + expire
        const saved = await user.save()
        console.debug("user after code", user)
        //console.debug("saved is ",saved)
        return user.email

    }


    static async verfiyEamil(ID: Schema.Types.ObjectId, code: String) {
        const user = await this.findById(ID);
        if (user == "-1") {

            throw new Error("user not found")
        }

        if (user.EmailActiveCode != code) {
            return false
        }


        if (user.codeExpireDate <= Date.now()) {


            return false
        }

        user.emailVerfied = true;
        await user.save()
        return true



    }

    static async resetpasswordDB(ID: Schema.Types.ObjectId, oldPassword: String, newPassword: String) {
        const user = await this.findById(ID);
        if (user == "-1") {

            throw new Error("user not found")
        }

        const Iscorrect = await bcryptL.compare(oldPassword, user.password)

        if (Iscorrect) {

            const hashedPassword = await bcryptL.hash(newPassword, 12)
            user.password = hashedPassword
            await user.save()

            return true

        } else {
            return false
        }



    }
    static async forgetpasswordDB(email: string, newPassword: string, code: string, expire = 3600000) {
        const user = await UserModel.findOne({ email: email });
        if (!user) {

            throw new Error("user not found")
        }
        console.debug("/*******", user.EmailActiveCode, "****", code)
        if (user.EmailActiveCode != code) {
            console.debug('code doesnt match')
            return false
        }
        if (user.codeExpireDate <= Date.now()) {

            console.debug('codeexpired')

            return false
        }
        var Hpassword = await this.CreateHashedPassword(newPassword)
        user.password = Hpassword
        await user.save()
        return true






    }

    static async editProfileDB(ID: Schema.Types.ObjectId, fName: string, lName: string, photo: string) {
        const user = await UserModel.findById(ID);
        if (!user) {
            return -1 // if email exists
        }
        await user.updateOne({ firstName: fName || user.fname, lastName: lName || user.lname, photo: photo || user.photo })

        await user.save()
    }

    static async createPostDB(ID: Schema.Types.ObjectId, description: string, photo: string) {

        return await new PostModel({
            description: description,
            photo: photo,
            creator: ID,
        }).save()

    }

    static async createCommentDB(userID: Schema.Types.ObjectId, postID: Schema.Types.ObjectId, text: string) {
        const post = await PostModel.findOne({ _id: postID })
        console.debug('post is ', post);
        return await new CommentModel({
            text: text,
            post: post?.id,
            creator: userID,
        }).save()

    }
    static async createLikeDB(userID: Schema.Types.ObjectId, postID: Schema.Types.ObjectId) {
        const post:any = await PostModel.findOne({_id:postID})
        console.debug('post is ', post);
        if (post.likes.includes(userID)) {
            return -2
            }
        
       await post.likes.push(userID)
      await  post.numberoflikes++
     return await post.save();

    }



}

