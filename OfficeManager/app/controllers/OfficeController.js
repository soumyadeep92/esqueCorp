const OfficeService=require('../services/OfficeService')
let fs=require('fs')

const OfficeController={
    getOffices:{},
    createOfficeOneMany:{},
    getOfficers:{},
    createOfficersOneOrMany:{},
    submitPortfolio:{}
}

OfficeController.getOffices=async(req,res)=>{
    try{
        const office_id=req.query.office_id
        if(!office_id){
            const getAllOffices=await OfficeService.getOffices()
            res.send({status:200,message:"Success",data:getAllOffices})
        }else{
            const offices=await OfficeService.getOffice(office_id)
            res.send({status:200,message:"Success",data:offices})
        }
    }catch(err){
        console.log(err)
        res.send({status:400,message:"Error",data:[]})
    }
}

OfficeController.createOfficeOneMany=async(req,res)=>{
    try{
        const arrayOfOffices=req.body;
        const createdOffices=await OfficeService.createOffices(arrayOfOffices)
        if(arrayOfOffices.length==1){
            res.send({status:200,message:"Success",data:[createdOffices]})
        }else if(arrayOfOffices.length>1){
            res.send({status:200,message:"Success",data:createdOffices})
        }
    }catch(err){
        console.log(err)
        res.send({status:400,message:"Error",data:[]})
    }
}

OfficeController.getOfficers=async(req,res)=>{
    try{
        const officer_id=req.query.officer_id
        const office_id=req.query.office_id
        if(!officer_id){
            const getAllOfficers=await OfficeService.getOfficers()
            res.send({status:200,message:"Success",data:getAllOfficers})
        }else if(officer_id && office_id){
            const officer=await OfficeService.getOneOfficer(office_id,officer_id)
            res.send({status:200,message:"Success",data:officer})
        }else if(!officer_id && office_id){
            const officers=await OfficeService.getOfficersByOffice(office_id)
            res.send({status:200,message:"Success",data:officers})
        }
    }catch(err){
        console.log(err)
        res.send({status:400,message:"Error",data:[]})
    }
}

OfficeController.createOfficersOneOrMany=async(req,res)=>{
    try{
        const arrayOfOfficers=req.body;
        const createdOfficers=await OfficeService.createOfficers(arrayOfOfficers)
        if(arrayOfOfficers.length==1){
            res.send({status:200,message:"Success",data:[createdOfficers]})
        }else if(arrayOfOfficers.length>1){
            res.send({status:200,message:"Success",data:createdOfficers})
        }
    }catch(err){
        res.send({status:400,message:"Error",data:[]})
    }
}

OfficeController.submitPortfolio=async(req,res)=>{
    try{
        let image=req.file.image_1
        let user_id=req.user.id
        let arr_file=[]
        if(image){
            let image_read=fs.createReadStream(image)
            image_read.on("data",chunk=>{
                for(let i in chunk){
                    arr_file.push(i)
                }
            }).on("error",err=>{
                console.log("Error",err)
            })
        }
        // if(arr_file.length>0){
        //     await OfficeService.updatePortfolio(user_id,arr_file)
        // }
        res.send({status:200,message:"Success",data:arr_file})
    }catch(err){
        res.send({status:400,message:"Error",data:[]})
    }
}

module.exports=OfficeController;