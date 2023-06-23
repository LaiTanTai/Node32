import express from 'express'   
import userRouter from './userRouter.js';
import { likeRouter } from './LikeRouter.js';
import { rateRouter } from './rateRouter.js';
const rootRoute = express.Router();
rootRoute.use("/user",userRouter)
rootRoute.use("/rate",rateRouter)
rootRoute.use("/like",likeRouter)
export default rootRoute