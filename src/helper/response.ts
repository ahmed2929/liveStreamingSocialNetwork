import express, {Request, Response} from 'express';

export default class response {
     // Custom response
 static CustomResponse (res:Response, status:number, messsage:string,data?:any){ 

    return res.status(status).json({
        messsage,
        data
    })

 }

  // 200 Ok
 static Ok (res:Response, messsage?:string,data?:any) {
    return res.status(200).json(
        {
            messsage,
            data
        }
    );
  }

  // 201 Ok
 static Created (res:Response, messsage?:string,data?:any)  {
    return res.status(201).json( {
        messsage:messsage||'data created',
        data
    });
  }

  // 204 No Content
 static NoContent(res:Response,messsage?:string){
    return res.status(204).json({
        messsage:messsage||'content not found'
    });
  }

  // 400 Bad request
 static BadRequest (res:Response, messsage?:string,data?:any)  {
    return res.status(400).json({ messsage:messsage||'bad request',data });
  }

  // 401 Unauthorized
 static Unauthorized (res:Response, messsage?:string,data?:any)  {
    return res.status(401).json({ messsage:messsage||'Unauthorized',data });
  }

  // 403 Forbidden
 static Forbidden (res:Response, messsage?:string,data?:any)  {
    return res.status(403).json({  messsage:messsage||'forbidden',data});
  }

  // 404 Not found
  static NotFound (res:Response, messsage?:string,data?:any)  {
    return res.status(404).json({ messsage:messsage||'not found',data });
  }



  // 422 Unprocessable Entity
  static UnprocessableEntity (res:Response, messsage?:string,data?:any)  {
    return res.status(422).json({messsage:messsage||'422 Unprocessable Entity',data });
  }

  // 500 Server error
  static ServerError (res:Response, err:Error, messsage?:string)  {
    console.error(err.message);
    
    return res.status(500).json({ messsage:messsage||'server error we are working to solve it soon'});
  }
}