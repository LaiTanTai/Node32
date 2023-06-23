// 200
const successCode = (res,data,mes)=>{
    res.status(200).json({
        mes,
        content:data,
    })
}
// 400
const failCode = (res,data,mes)=>{
    res.status(400).json({
        mes,
        content:data,
    })
}
// 500
const errorCode = (res,data,mes)=>{
    res.status(500).json({
        mes,
    })
}
export {errorCode,failCode,successCode}