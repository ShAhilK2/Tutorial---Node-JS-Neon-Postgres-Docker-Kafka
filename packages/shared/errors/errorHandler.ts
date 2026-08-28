
import {Request,Response,NextFunction} from "express";
import { AppError } from "./AppError";
export function ErrorHandler(
    err : unknown,
    _req:Request,
    res:Response,
    _next:NextFunction
){
    if(err instanceof AppError){
      
       return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }


    // Logger Error


    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });



}
