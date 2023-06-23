// yarn init : tạo ra file pakage.json
// yarn add express
import { error } from 'console';
import express, { response } from 'express';
import cors from "cors"
import { request } from 'http';
const app = express();
app.use(express.static("."))
// middle ware : những dòng lệnh hoặc hàm chính giữa xử lý một vấn đề gì đó 
app.use(express.json())// giúp backend đọc được json
app.use(cors({
    origin:["http://localhost:5500","http://127.0.0.1:5500"]
})); //middleware cahaps nhận tất cả các port
app.listen(8080) // Tạo server BE với port 8080
// Khởi chạy server
// yarn add nodemon => auto reset khi save
// tạo API => endpoint
// Get:demo
app.post("/demo/:id2",(request,response)=>{
    // request
    // params : get data from url
    // -query string : /demo?id=1&hoTen=abc
    let {id,hoTen} = request.query
    // -query params : /demo/1/abc
    let {id2,hoTen2} = request.params
    // body : json structure
    let {userId,userName,email,phone} = request.body
    // data trả từ backend về frontend
    response.send({userId,userName,email,phone})
}) 
// kết nối csdl

// truy vấn 

// yarn add mysql2
// import mysql from "mysql2"
import rootRoute from './router/rootRouter.js';
// const connect = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Tantai1210",
//     port:"3309",
//     database:"db_node32"
// }); 
// viết thường cách nhau bằng dấu gạch ngang
app.use("/api",rootRoute)
// Thông thường khi chạy frontend ta sẽ bị vướng lỗi CORS là một lỗi bảo mật của trình duyejt web 
// yarn add cors
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"]
}

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));



