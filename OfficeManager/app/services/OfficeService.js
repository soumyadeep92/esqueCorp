const {office,officer}=require("../config/sequelize");
const db=require("../config/sequelize")

const OfficeService={
    getOffices:{},
    getOfficers:{},
    createOffices:{},
    getOfficersByOffice:{},
    createOfficers:{},
    getOffice:{},
    getOneOfficer:{},
    updatePortfolio:{}
}

OfficeService.getOffices=async()=>{
    const getAllOffices=await office.findAll()
    return getAllOffices
}

OfficeService.getOfficers=async()=>{
    const getAllOfficers=await officer.findAll()
    return getAllOfficers
}

OfficeService.createOffices=async(office_data)=>{
    if(office_data.length==1){
        await office.create(office_data[0])
    }else if(office_data.length>1){
        await office.bulkCreate(office_data)
    }else{

    }
}

OfficeService.getOfficersByOffice=async(office_id)=>{
    const getAllOffices=await officer.findAll({id:office_id})
    return getAllOffices
}

OfficeService.createOfficers=async(officer_data)=>{
    if(officer_data.length==1){
        await officer.create(officer_data[0])
    }else if(officer_data.length>1){
        await officer.bulkCreate(officer_data)
    }else{

    }
}

OfficeService.getOffice=async(office_id)=>{
    const getOfficeById=await office.findOne({id:office_id})
    return getOfficeById
}

OfficeService.getOneOfficer=async(office_id,officer_id)=>{
    let getOfficerById={}
    if(officer_id){
        getOfficerById=await officer.findOne({id:officer_id})
    }else if(office_id && officer_id){
        getOfficerById=await officer.findOne({id:officer_id,office_id:office_id})
    }
    return getOfficerById
}

OfficeService.updatePortfolio=async(user_id,arr_file)=>{
    await db.sequelize.query(`UPDATE users SET id=${user_id}`)
}

module.exports=OfficeService