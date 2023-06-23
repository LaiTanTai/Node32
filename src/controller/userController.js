import { Model, Sequelize } from 'sequelize'
import initModels from "../model/init-models.js"
import sequelize from '../model/index.js'
import { successCode,failCode,errorCode } from '../config/response.js'
import {generateToken,decodeToken,checkToken} from '../config/jwt.js'
import bcrypt from 'bcrypt'
const model = initModels(sequelize)
// environment variable : the place store code
const Op = Sequelize.Op
const getNguoidung = async (req,res)=>{
    try {
    // bất đồng bộ 
    // truy vấn bằng các câu lệnh ORM
    // Select * from food
    let data = await model.food.findAll({
        include:["type"]
    })
    successCode(res,data,"Success")
    }catch{
        res.status(500).send("get user failed")
    }
}
const getuserpage =async (req,res)=>{
    try{
        let {page , pageSize } = req.params;
        let index = (page-1)*pageSize;
        // SELECT *FROM LIMIT index , pageSize
        let data = await model.user.findAll({
            offset:index,
            limit:Number(pageSize)
        })
        successCode(res,data,"success")
    }catch{ 
        errorCodeCode(res,[],"Failed")
    }
}
const createNguoiDung = async (req,res)=>{
    try {
        let {full_name,email,password} = req.body;
        let newdata = {
            full_name,
            email,
            password,
        }
    //INSERT INTO food Values ()
    await model.user.create(newdata);
    res.send("Success created")
    } catch {
        res.status(500).send("Failed created")
    }
}
// cập nhật người dùng
const updateNguoidung = async (req,res)=>{
    try {
        let {user_id} = req.params
        let {full_name,email,password} = req.body
        await model.user.update({
            full_name,email,password
        },{where:{user_id}})
        res.send("Update Successfully")
    } catch{
        res.status(500).send("Update failed")
    }   
}
// Tim kiem nguoi dung 
const getNguoidungId = async(req,res)=>{
    try {
        let {user_id} = req.params
    let data = await Model.user.findAll({
        where:{user_id}
    })
        res.send(data);
    } catch {
        res.status(500).send("get user failed")
    }
}
// xóa người dùng 
const deleteNguoidung = async (req,res)=>{
    try {
        let {user_id} = req.params
        let checkfood = await model.user.findAll({where:{user_id}});
        if(checkfood){
            await model.user.destroy({where:{user_id}})
            res.status(200).send("Xóa thành công")
        }else{
            res.status(404).send("Item doesnt exist")
        }
    } catch{
        res.statuc(500).send("failed to delete user")
    }
    
}
const signup = async (req,res)=>{
    try {
        let {full_name,email , pass_word} = req.body;
        let checkUser = await model.user.findAll({
            where:{
                email
            }
        })
        if(checkUser.length > 0){
            failCode(res,"","Email đã tồn tại !") //400
        }else{
            let newUser = {full_name,email,pass_word:bcrypt.hashSync(pass_word,10)}
            await model.user.create(newUser);
            successCode(res,"","Đăng ký thành công");
        }
    await model.user.create({full_name,email,password});
    successCode(res,"","Đăng ký thành công")

    } catch (error) {
        res.send("lỗi BE"); 
    }
}    
const login = async (req,res)=>{
    try {
        let {email,pass_word} = req.body;
        let checkUser = await model.user.findOne({
            where:{email}
        })
        if(checkUser){
            let token = generateToken(checkUser)
            if(bcrypt.compareSync(pass_word,checkUser.pass_word)){
            successCode(res,token,"Đăng nhập thành công !")
            }
        }else{
            // email hoặc password không dùng
            failCode(res,"","Email hoặc mật khẩu không đúng !")
        }
    } catch (error) {
        res.send("BE error")
    }
        
}
export {
    login,
    signup,
    getNguoidung,
    createNguoiDung,
    updateNguoidung,
    deleteNguoidung,
    getNguoidungId,
    getuserpage
}