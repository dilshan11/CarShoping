const mongoose=require('mongoose');

const AD=mongoose.model('AD',new mongoose.Schema({
    area: String,
    capacity: Number,
    condition:String,
    description: String,
    district:String,
    email: String,
    fualType: String,
    fullName: String,
    image: [],
    manufacture: String,
    millage:Number,
    model: String,
    phoneNumber: String,
    price: Number,
    transmission: String,
    userId: String,
    vtype: String,
    year: Number,
    search:String,
    date:{type:Date,default:Date.now}
})
)

module.exports=AD;