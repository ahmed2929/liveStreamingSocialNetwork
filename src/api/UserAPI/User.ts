
import express, { NextFunction } from 'express'
import UserGeneralServices from '../../services/UserGeneralServices'
import AuthHelper from '../../helper/Auth'
import Response from '../../helper/response'
const Router = express.Router();


Router.get('/GetUsers', async (req: any, res: any, next: NextFunction) => {

    /*move it to spirt file it make sure that req is authrized*/
    const result: any = await AuthHelper.isAuhrized(req, res, next);
    if (result == '0') {
        Response.Unauthorized(res)
    } else if (result == '-1') {
        Response.CustomResponse(res, 500, "an error ocured")
    } else {
        console.debug("result ", result)
        req.userID = result.UserID
        return next()
    }


}, async (req: any, res: any, next: any) => {
    console.debug("userID is ", req.userID)
    let users = await UserGeneralServices.getUsers(req.query.ID)
    if (users == '-1') {
        Response.NotFound(res)
    } else {

        Response.Ok(res, 'ok', { users });

    }





});




Router.post('/editProfile', async (req: any, res: any, next: NextFunction) => {

    /*move it to spirt file it make sure that req is authrized*/
    const result: any = await AuthHelper.isAuhrized(req, res, next);
    if (result == '0') {
        Response.Unauthorized(res)
    } else if (result == '-1') {
        Response.CustomResponse(res, 500, "an error ocured")
    } else {
        console.debug("result ", result)
        req.userID = result.UserID
        return next()
    }


}, async (req: any, res: any, next: any) => {
    console.debug("userID is ", req.userID)
    const { firstName, lastName, photo } = req.body
    let result = await UserGeneralServices.editProfile(req.userID, firstName, lastName, photo)
    if (!result) {
        Response.NotFound(res)
    } else {

        Response.Ok(res, 'ok', { result });

    }
})

Router.post('/createPost', async (req: any, res: any, next: NextFunction) => {

    /*move it to spirt file it make sure that req is authrized*/
    const result: any = await AuthHelper.isAuhrized(req, res, next);
    if (result == '0') {
        Response.Unauthorized(res)
    } else if (result == '-1') {
        Response.CustomResponse(res, 500, "an error ocured")
    } else {
        console.debug("result ", result)
        req.userID = result.UserID
        return next()
    }



}, async (req: any, res: any, next: any) => {
    console.debug("userID is ", req.userID)
    const { description, photo } = req.body
    let result = await UserGeneralServices.createPost(req.userID, description, photo)
    if (!result) {
        Response.NotFound(res)
    } else {

        Response.Ok(res, 'Post created', { result });

    }
})


Router.post('/createComment', async (req: any, res: any, next: NextFunction) => {

    const result: any = await AuthHelper.isAuhrized(req, res, next);
    if (result == '0') {
        Response.Unauthorized(res)
    } else if (result == '-1') {
        Response.CustomResponse(res, 500, "an error ocured")
    } else {
        console.debug("result ", result)
        req.userID = result.UserID
        return next()
    }



}, async (req: any, res: any, next: any) => {
    console.debug("userID is ", req.userID)
    const { text,postId } = req.body
    let result = await UserGeneralServices.createComment(req.userID,postId, text)
    if (!result) {
        Response.NotFound(res)
    } else {

        Response.Ok(res, 'Comment created', { result });

    }
})

Router.post('/createLike', async (req: any, res: any, next: NextFunction) => {

    const result: any = await AuthHelper.isAuhrized(req, res, next);
    if (result == '0') {
        Response.Unauthorized(res)
    } else if (result == '-1') {
        Response.CustomResponse(res, 500, "an error ocured")
    } else {
        console.debug("result ", result)
        req.userID = result.UserID
        return next()
    }



}, async (req: any, res: any, next: any) => {
    console.debug("userID is ", req.userID)
    let result = await UserGeneralServices.createLike(req.userID,req.body.postID)
    console.debug('post id is ',req.body.postID)
    if (result===-2) {
      
      return  res.status(400).json({
            state:0,
            message :"you already have liked this post "
            
        })

    }
    if (!result) {
        Response.NotFound(res)
    } else {

        Response.Ok(res, 'Like created', { result });

    }

})



















export default Router;
