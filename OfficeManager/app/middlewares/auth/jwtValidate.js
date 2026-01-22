const jwt=require("jsonwebtoken")

const validate_jwt=(req,res,next)=>{
    const token=req.authorization.split("")[0]
    if(token){
        jwt.validate(token,`${process.env.jwt_secret}`,function(val,err){
            if(err){
                res.send({status:400,message:"Invalid JWT token",data:[]})
            }else{
                if(val.isLoggedIn){
                    next()
                }else{
                    res.send({status:400,message:"User is logged in",data:[]})
                }
            }
        })
    }else{
        res.send({status:400,message:"Missing JWT token",data:[]})
    }
}

module.exports=validate_jwt