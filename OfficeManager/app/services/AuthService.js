const {office,officer,user}=require("../config/sequelize");
const db=require("../config/sequelize")

const AuthService={
    findOneUser:{},
    findUserByEmail:{},
    updateLoggedStatus:{}
}

AuthService.findOneUser=async (id)=>{
    const userDetails=await user.findOne(id)
    return userDetails
}

AuthService.findUserByEmail=async (email,password)=>{
    const userDetails=await user.findOne({email_id:email,password:password})
    return userDetails
}

AuthService.updateLoggedStatus=async (user_id)=>{
    await db.sequelize.query(`UPDATE users SET isLoggedIn=true WHERE id=${user_id}`)
}

module.exports=AuthService