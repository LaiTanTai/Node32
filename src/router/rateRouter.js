import express from 'express';
import { getRateRes ,getRateuser,postRateRes } from '../controller/rate_resController';
import { tokenAPI } from '../config/jwt';
const rateRouter = express.Router();
rateRouter.get("/get-user-rate/:user_id",tokenAPI,getRateuser)
rateRouter.get("/get-res-rate/:res_id",tokenAPI,getRateRes)
rateRouter.post("/add-rate/:res_id/:user_id",tokenAPI,postRateRes)
export{
    rateRouter
}