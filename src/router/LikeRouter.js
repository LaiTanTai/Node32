import express from 'express';
import { getLikeRes, getLikeuser, postLikeRes } from '../controller/like_resController';
import { tokenAPI } from '../config/jwt';
const likeRouter = express.Router();
likeRouter.get("/get-like-user/:user_id",tokenAPI,getLikeuser)
likeRouter.get("/get-like-res/:res_id",tokenAPI,getLikeRes)
likeRouter.post("/like-res/:user_id/:res_id",tokenAPI,postLikeRes);
export{
    likeRouter
}