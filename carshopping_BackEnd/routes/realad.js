const express=require('express');
const router=express.Router();
const AD=require('../models/realad');
const PendingForm=require('../models/pendingForm');

router.get('/',(req,res)=>{
    res.send('get ads');
});

router.get('/myad/:id',async(req,res)=>{
    try{
    let result=await AD.find({userId:req.params.id});
     
    if(result==null){
        res.send({message:"you haven't Ads"})
        return;
    }
    res.send({message:'success',ads:result});
    }
    catch(e){
            res.send({message:'try again'});
    }
});

router.get('/detailedAd/:id',async(req,res)=>{
       
    try{
    let result=await AD.findOne({_id:req.params.id});
    res.send({message:result});
    }catch(e){
        res.send({message:'try again'});
    }

})

router.post('/getallTest/:pnum',async(req,res)=>{
   try{ 
    //    let pageNum=req.query.pageNum;
       let pageNum=req.params.pnum;

    let temp={

        minyear: parseInt(req.body.minyear),
        maxyear: parseInt(req.body.maxyear),
        minmillage:parseInt(req.body.minmillage),
        maxmillage:parseInt(req.body.maxmillage),
        minprice: parseInt(req.body.minprice),
        maxprice: parseInt(req.body.maxprice),
     }

     let qo={
        condition:req.body.condition,
        district:req.body.district,
        fualType: req.body.fualType,
        manufacture: req.body.manufacture,
       model: req.body.model,
       transmission:req.body.transmission,
        vtype: req.body.vtype,
        search:{ $regex: '.*' + req.body.search+ '.*', $options: 'i'}, 
        price:{$gte:temp.minprice,$lte:temp.maxprice},
        year:{$gte:temp.minyear,$lte:temp.maxyear },
        millage:{$gte:temp.minmillage,$lte:temp.maxmillage}
     }
    
     Object.keys(qo).forEach(key => {
        if (qo[key] === '@#') {
          delete qo[key];
        }
      });
      
      
      let ads=await AD
      .find(qo)
      .skip((pageNum-1)*10)
      .limit(10);
      
    //   let pagemount='@#';
    //   if(pageNum=='1'){
       let adsamount=await AD.count(qo);
      
    //   }
   
      
      res.send({message:"success",opt:ads,adsamount:adsamount});
     } catch(e){
         console.log(e);
        res.send({message:"try again"});
     }
        
});

 

router.post('/save',async(req,res)=>{
    try{
    let arti=await PendingForm.deleteOne({_id:req.body._id});
    if(arti==null){
        res.send({message:"already deleted it"});
        return;
    }

    
    let ad=new AD({
        area: req.body.area,
        capacity: parseInt(req.body.capacity),
        condition:req.body.condition,
        description: req.body.description,
        district:req.body.district,
        email: req.body.email,
        fualType: req.body.fualType,
        fullName:req.body.fullName,
        image: req.body.image,
        manufacture: req.body.manufacture,
        millage:parseInt(req.body.millage),
        model: req.body.model,
        phoneNumber: req.body.phoneNumber,
        price: parseInt(req.body.price),
        transmission:req.body.transmission,
        userId: req.body.userId,
        vtype: req.body.vtype,
        year: parseInt(req.body.year),

        search: req.body.vtype+' '+req.body.model+' '+ req.body.manufacture+' '+ req.body.district+' '+req.body.area+' '+req.body.condition+' '+req.body.transmission,
    });

    let result=await ad.save();
    res.send({message:result});
    
    }
    catch(e){
        res.send({message:'try again'});
    }

});

router.post('/update',async(req,res)=>{
    let result=await AD.update({_id:req.body._id},{
        $set:{
        area: req.body.area,
        capacity: parseInt(req.body.capacity),
        condition:req.body.condition,
        description: req.body.description,
        district:req.body.district,
        email: req.body.email,
        fualType: req.body.fualType,
        fullName:req.body.fullName,
        image: req.body.image,
        manufacture: req.body.manufacture,
        millage:parseInt(req.body.millage),
        model: req.body.model,
        phoneNumber: req.body.phoneNumber,
        price: parseInt(req.body.price),
        transmission:req.body.transmission,
        userId: req.body.userId,
        vtype: req.body.vtype,
        year: parseInt(req.body.year),
        search: req.body.vtype+' '+req.body.model+' '+ req.body.manufacture+' '+ req.body.district+' '+req.body.area+' '+req.body.condition+' '+req.body.transmission,

        }
    });
    
    res.send({message:result});
})


router.get('/delete/:id',async(req,res)=>{
    try{
    let result=await AD.findByIdAndRemove(req.params.id);
    res.send({message:'success'});
    }catch(e){
        res.send({message:'try again'});
    }
})

module.exports=router;