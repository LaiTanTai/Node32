import  jwt  from "jsonwebtoken";
// tạo token 
const generateToken = (data)=>{
    // 1 lấy dữ liệu muốn mã hóa thành token => payload
    // 2 secret key => signature
    // 3 hạn sử dụng , thuật toán => header
    return jwt.sign({data},"FLASH",{expiresIn:"5m",algorithm:"HS256"});
}
// kiểm tra tính hợp lệ của token 
const checkToken = (token)=>{
    return jwt.verify(token , "FLASH");
}
// giải mã token
const decodeToken = (token)=>{
    return jwt.decode(token);
}
const tokenAPI = (req,res,next)=>{
    
    // Kiểm tra token
    try {
        let {token} = req.headers
        if(checkToken(token)){
            next()
        }
    } catch (error) {
        res.sendStatus(404).send(error.message)
    }
    
    // dúng thì next 
    // sai thì báo
}
export {
    tokenAPI,
    generateToken,
    checkToken,
    decodeToken
}
