const express=require('express');
const router=express.Router();
const Users=require('../models/user');
 

router.get('/',(req,res)=>{
    res.send({message:'get users'});
});

router.get('/getUser/:id',async(req,res)=>{
    try{
    let result=await Users.findById(req.params.id);
     res.send({message:result});
    }catch(e){
        res.send({message:'try again'});
    }

})


// router.post('/vehi',async(req,res)=>{
//     let vehi=new Vehicle({
//         name:req.body.name
//     })
//     let result=await vehi.save();
//     console.log(result);
//     res.send("sesdedwfwf");
// })

router.post('/saveFav',async(req,res)=>{

     try{
    let result=await Users.findOne({_id:req.body.userId});
    if(result==null){
        res.send({message:'try again'});
        return;
    }
    result.favoriteAds.push(req.body.adId);
     await result.save();
    res.send({message:result});
     }catch(e){
         res.send('try again');
     }

});

router.get('/fav/:id',async(req,res)=>{
    let result=await Users.findOne({_id:req.params.id})
    .populate('favoriteAds');
    
    res.send(result);
});

router.post('/fvtad/delete',async(req,res)=>{
    try{
    let result=await Users.findById(req.body.userId);
    let index=result.favoriteAds.indexOf(req.body.adId);
  
    if(index>-1){
        result.favoriteAds.splice(index,1); 
    }
    else{
        res.send({message:'wait a second'});
        return;
    }
    await result.save();
     res.send({message:'success'});

    }catch(e){
        res.send({message:'try again'});
    }
})


router.post('/logging',async(req,res)=>{
    try{
       
    let result=await Users.findOne({email:req.body.email});
  
    if(result==null){
        res.send({message:'This email is not registerd'});
        return;
    }
    if(result.password!=req.body.password){
        res.send({message:'password is not matching'});
        return;
    }
    if(result.password==req.body.password){
        res.send({message:'success',obj:result});
        return;
    }
  }catch(e){
        res.send({message:'try again'});
  }
});

router.post('/register', async(req,res)=>{
           
    try{

        let result=await Users.findOne({email:req.body.email});
        if(result!=null){
            res.send({message:'email is already registered'});
            return;
        }
         
    let user=new Users({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber
    });
       
        user=await user.save();
      
        res.send({message:'success'});
}catch(e){
    console.log(e);
    res.send({message:'try again'});
}
       
       
})


router.post('/update',async(req,res)=>{
    console.log(req.body);
    try{
    let result=await Users.update({_id:req.body.userId},{
        $set:{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber
        }
    });
    res.send({message:'success',otp:result});

    }catch(e){
        res.send({message:'Try again'});
    }
})

router.post('/passwordUpdate',async(req,res)=>{
    try{
    let result=await Users.update({_id:req.body.userId},{
        $set:{
            password:req.body.password
        }
    })
    res.send({message:'success',otp:result});
    }
    catch(e){
        res.send({message:'Try again'});
    }
})

module.exports=router;
