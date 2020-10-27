import { Application } from "express";
import bodyParser from 'body-parser';
import AuthAPI from './api/auth/localAuth';
export default function (app:Application){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/auth',AuthAPI);

    return app;
}