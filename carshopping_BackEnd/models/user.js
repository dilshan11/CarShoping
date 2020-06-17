const mongoose=require('mongoose');

const Users=mongoose.model('Users',new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    password:{type:String},
    email:{type:String},
    phoneNumber:{type:String},
    favoriteAds:[{
        type:mongoose.Schema.Types.ObjectId,
         ref: 'AD'
    }]
})
)

module.exports=Users;