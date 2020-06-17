const mongoose=require('mongoose');

const Vehicle= mongoose.model('vehicle', new mongoose.Schema({
    name:String
}))

module.exports=Vehicle;