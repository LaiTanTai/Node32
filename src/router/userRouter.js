import { getNguoidung , createNguoiDung ,updateNguoidung, deleteNguoidung ,getNguoidungId ,getuserpage,signup,login} from '../controller/userController.js';
import express from 'express';
import upload from '../controller/uploadController.js';
const userRouter = express.Router();
// file system
import fs from 'fs'
import { verify } from 'crypto';
import { checkToken, tokenAPI } from '../config/jwt.js';
userRouter.post("/base64",(req,res)=>{
    let file = req.file;
    fs.readFile(process.cwd() + "/text.txt" +file.filename,(err,data)=>{});
    // fs.appendFile() viết thêm vào file
    res.send("success")
})
userRouter.post("/upload",upload.single("file"),(req,res)=>{
    let file = req.file
    res.send(file)
})
userRouter.get("/get-nguoi-dung",getNguoidung) 
userRouter.get("/get-nguoi-dung-by-id/:food_id",tokenAPI,getNguoidungId) 
userRouter.post("/create-nguoi-dung",tokenAPI,createNguoiDung)
userRouter.put("/cap-nhat-nguoi-dung/:food_id",tokenAPI, updateNguoidung)
userRouter.delete("/xoa-nguoi-dung/:food_id",tokenAPI,deleteNguoidung)
userRouter.get("/get-user-page/:page/:pageSize",tokenAPI,getuserpage)
// Thêm dữ liệu vào table user 
userRouter.post("/signup",signup)
// Kiểm tra dữ liệu trong table user
userRouter.post("/login",login)
export default userRouter; 