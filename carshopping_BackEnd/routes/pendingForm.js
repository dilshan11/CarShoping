const express=require('express');
const router=express.Router();
const PendingForm=require('../models/pendingForm');

router.get('/',(req,res)=>{
    res.send('get users');
});

router.get('/getall',async(req,res)=>{
    
    let pageNum=req.query.pageNum;
    const ads=await PendingForm
    .find()
    .skip((pageNum-1)*10)
    .limit(10);

    res.send(ads);
});


router.get('/userPdAds/:id',async(req,res)=>{
    try{
    let result=await PendingForm.find({userId:req.params.id});
    if(result==null){
        res.send({message:"You haven't pendind ads"});
        return;
    }
    res.send({message:'success',ads:result});
        
    }catch(e){
        res.send({message:'try again'});
    }
})

router.post('/save',async(req,res)=>{

    try{
    let pendingForm=new PendingForm({
        area: req.body.area,
        capacity: req.body.capacity,
        condition:req.body.condition,
        description: req.body.description,
        district:req.body.district,
        email: req.body.email,
        fualType: req.body.fualType,
        fullName:req.body.fullName,
        image: req.body.image,
        manufacture: req.body.manufacture,
        millage:req.body.millage,
        model: req.body.model,
        phoneNumber: req.body.phoneNumber,
        price: req.body.price,
        transmission:req.body.transmission,
        userId: req.body.userId,
        vtype: req.body.vtype,
        year: req.body.year,
    });

    let result=await pendingForm.save();
    res.send({message:result});
    
    }
    catch(e){
        res.send({message:'try again'});
    }

});


router.get('/PdAds/:id',async(req,res)=>{
      
    try{
        let result=await PendingForm.findOne({_id:req.params.id});
        res.send({message:result});
        }catch(e){
            res.send({message:'try again'});
        }
});

router.get('/delete/:id',async(req,res)=>{
    try{
    let result=await PendingForm.findByIdAndRemove(req.params.id);
    res.send({message:'success'});
    }catch(e){
        res.send({message:'try again'});
    }
})

module.exports=router;