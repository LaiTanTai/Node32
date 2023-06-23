import express from 'express'   
import userRouter from './userRouter.js';
const rootRoute = express.Router();
rootRoute.use("/user",userRouter)
export default rootRoute