import { Model, Sequelize } from 'sequelize'
import { successCode,failCode,errorCode } from '../config/response.js'
import initModels from '../model/init-models';
import sequelize from '../model/index.js'

const model = initModels(sequelize)
const postLikeRes = async (req,res)=>{
    try {
        let {user_id,res_id} = req.body;
        let data = await model.like_res.findOne({
            where:{
                user_id,
                res_id
            }
        })
        if(data){
            await model.like_res.destroy({
                where:{
                    user_id,
                    res_id
                }
            })
        }else{
            let newdata = {
                user_id,
                res_id,
                date_like:new Date()
            }
            await model.like_res.create(newdata)
        }
    } catch (error) {
        console.log(error,"postLikeRes")
    }
}
const getLikeRes = async (req,res)=>{
    try {
        let {res_id} = req.body;
        let data = await model.like_res.findAll({
            where:{
                res_id
            }
        })
        successCode(res,data.length,"Tổng số like nhà hàng là")
    } catch (error) {
        console.log(error,"getLikeRes")
    }
}
const getLikeuser = async (req,res)=>{
    try {
        let {user_id} = req.body;
        let data = await model.like_res.findAll({
            where:{
                user_id
            }
        })
        successCode(res,data.length,"Tổng số like của người dùng là")
    } catch (error) {
        console.log(error,"getLikeUser")
    }
}
export {
    postLikeRes,
    getLikeRes,
    getLikeuser
}