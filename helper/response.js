export const sendSucces = (res,statusCode,message,data={}) =>{
    return res.status(statusCode).json({
        success:true,
        message
        ,data})
}

export const sendError = (res,statusCode,message)=> {
    return res.status(statusCode).json({
        success:false,
        message
    })
}