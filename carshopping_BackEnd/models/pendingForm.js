const mongoose=require('mongoose');

const PendingForm=mongoose.model('PendingForm',new mongoose.Schema({
    area: String,
    capacity: String,
    condition:String,
    description: String,
    district:String,
    email: String,
    fualType: String,
    fullName: String,
    image: [],
    manufacture: String,
    millage:String,
    model: String,
    phoneNumber: String,
    price: String,
    transmission: String,
    userId: String,
    vtype: String,
    year: String
})
)

module.exports=PendingForm;