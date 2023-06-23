import multer from 'multer';
// __dirname : trả về đường dẫn file đang đứng
// process.cwd(): trả về đường dẫn gốc

const storage = multer.diskStorage({
    destination: process.cwd() + "/public/image",
    filename:(req,file,callback)=>{
        let newName = new Date().getTime() + "_" + file.originalname;
        callback(null,newName)
    }   
})
const upload = multer({
    storage:storage //destination : khai báo nơi lưu tài nguyên 
});

export default upload