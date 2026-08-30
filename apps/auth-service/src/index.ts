import { config } from "dotenv";
import { resolve } from "path";
import express from "express";
import {httpLogger, successResponse, AppError, errorHandler, logger} from "shared";

config({path : resolve(process.cwd(), ".env")});
config({path : resolve(process.cwd(), "../../.env")});




const PORT = process.env.AUTH_PORT || 3001;


const app = express();

app.use(httpLogger);
app.use(express.json());


app.get("/health", (_req, res) => {

    successResponse(res, {service : "auth-service"});
    
});


app.use((_req, _res, next) => {
    next(new AppError(404,"Route not found"));
   
});


app.use(errorHandler);


app.listen(PORT, () => {
    logger.info(`Auth service running on port ${PORT}`);
});