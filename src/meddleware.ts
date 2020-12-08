import { Application } from "express";
import bodyParser from 'body-parser';
import AuthAPI from './api/auth/localAuth';
import generalAPI from './api/UserAPI/User'
import dotenv ,{config} from "dotenv"
export default function (app:Application){
    //app.use(config);    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/auth',AuthAPI);
    app.use('/general',generalAPI)

    return app;
}