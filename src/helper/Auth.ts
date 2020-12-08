
import bycript from 'bcrypt'
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export default class AuthHelper {
    static async CreateHashedPassword(password: string) {

        return await bycript.hash(password, 12);

    }

    static async CompareHashedPassword(pass1: string, pass2: string) {

        return await bycript.compare(pass1, pass2);
    }

    static GenerateJTW(UserID: string) {
        return jwt.sign(
            {
                UserID
            },
            'AK'
<<<<<<< HEAD
         );
     }
 
    static async Decodejwt(token:string){
        try{
            const userID=await jwt.verify(token.toString(),'AK');
            console.debug("userid is ",userID)
            return userID

        }catch(err){
            console.debug("error is ",err)
        }

 
     }
=======
        );
    }

    static async Decodejwt(token: string) {
        
        return jwt.verify(token, 'AK');

    }
>>>>>>> 94bdd94809db3d3a2b7c1696e7bbb5b940af883c

    static async getToken(req: any) {

        /**
         * get token from user request
         * return 0 if there is no token
         * return tokent if it exist 
         * 
         * 
         */




        const token = req.header('Authorization');
        console.debug('token is', token);
        if (!token) {
            return '0'
<<<<<<< HEAD
                       
        }
        const token =req.get('Authorization').toString().split(' ')[1];
=======
>>>>>>> 94bdd94809db3d3a2b7c1696e7bbb5b940af883c

        }
        return token


    }

    static async isAuhrized(req: Request, res: Response, next: NextFunction) {
        /**
         * return 0 if user is not authorized
         * return userId if user is authorized
         * return -1 an error ocurred
         * 
         * 
         * 
         */
<<<<<<< HEAD
        const token : string=await this.getToken(req);
        console.debug("token is ",token)
        if(token == '0'){
=======
        const token: string = await this.getToken(req);
        
        if (token == '0') {
>>>>>>> 94bdd94809db3d3a2b7c1696e7bbb5b940af883c
            return '0'
        }


<<<<<<< HEAD
        const UserId :any=await this.Decodejwt(token);
        console.debug("userID",UserId)
        if(!UserId){
=======
        const UserId: any = await this.Decodejwt(token);

        if (!UserId) {
>>>>>>> 94bdd94809db3d3a2b7c1696e7bbb5b940af883c

            return '-1'
        }

        return UserId


    }

}