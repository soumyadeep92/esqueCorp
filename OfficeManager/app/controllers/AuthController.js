const AuthService=require("../controllers/AuthController")
const jwt=require("jsonwebtoken")
const passport = require("passport");

const AuthController={
    login:{},
    register:{}
}

AuthController.login=async(req,res)=>{
    try{
        passport.authenticate('local',{session:false},async function(err,data,info){
            const username=data.username
            const password=data.password
            if(!err || !data){
                res.send({status:400,message:"Login not successful",data:{},token:"",refresh_token:""})
            }else{
                await AuthService.updateLoggedStatus(data.id)
                let jwtPayload={
                    id:data.id,
                    username:username,
                    passsword:password,
                    isLoggedIn:data.isLoggedIn
                }
                let jwtRefreshPayload={
                    id:data.id,
                    username:username,
                    passsword:password,
                    isLoggedIn:data.isLoggedIn
                }
                let access_token=jwt.sign(jwtPayload,process.env.jwt_secret,{session:false},{expiresIn:process.env.access_expiry})
                let refresh_token=jwt.sign(jwtRefreshPayload,process.env.jwt_secret,{session:false},{expiresIn:process.env.refresh_expiry})
                res.send({status:200,message:"Success",data:jwtPayload,token:access_token,refresh_token:refresh_token})
            }
        })(req,res,next)
    }catch(err){
        res.send({status:400,message:"Error",data:{},token:"",refresh_token:""})
    }
}

AuthController.register=async(req,res)=>{
    try{

    }catch(err){
        res.send({status:400,message:"Error",data:{}})
    }
}

module.exports=AuthController