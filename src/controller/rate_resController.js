import { Model, Sequelize } from 'sequelize'
import { successCode,failCode,errorCode } from '../config/response.js'
import initModels from '../model/init-models';
import sequelize from '../model/index.js'
const model = initModels(sequelize)

const postRateRes = async (req,res)=>{
    try {
        let {user_id,res_id,amount} = req.params;
        let data = await model.rate_res.findOne({
            where:{
                user_id,
                res_id
            }
        })
        if(data){
            await model.rate_res.update(
                {
                    user_id,
                    res_id,
                    amount,
                    date_rate:new Date()
                },
                {
                    where:{
                        user_id,
                        res_id,
                    }
                }
            )
        }else{
            let newdata = {
                user_id,
                res_id,
                amount,
                date_rate:new Date()
            }
            await model.rate_res.create(newdata)
        }
    } catch (error) {
        console.log(error,"postRateUser")
    }
}
const getRateRes = async (req,res)=>{
    try {
        let {res_id} = req.params;
        let data = await model.rate_res.findAll({
            where:{
                res_id
            }
        })
        successCode(res,data.user_id,"Tổng số rate nhà hàng là")
    } catch (error) {
        console.log(error,"getLikeRes")
    }
}
const getRateuser = async (req,res)=>{
    try {
        let {user_id} = req.params;
        let data = await model.rate_res.findAll({
            where:{
                user_id
            }
        })
        successCode(res,data.res_id,"Tổng số rate của người dùng là")
    } catch (error) {
        console.log(error,"getLikeUser")
    }
}
export{
    postRateRes,
    getRateRes,
    getRateuser
}