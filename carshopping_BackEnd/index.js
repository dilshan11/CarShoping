const express=require('express');
const user=require('./routes/user');
const pendingForm=require('./routes/pendingForm');
const realad=require('./routes/realad');
const mongoose=require('mongoose');
const app=express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//   mongoose.connect('mongodb://localhost/CarShopping')

mongoose.connect('mongodb+srv://dilshan11:nanayakkara@chatapp-ukl5u.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>console.log('Connected to mongodb'))
.catch((err)=>console.log('could not connect'));

app.use(express.json());

app.use('/api/user',user);

app.use('/api/pendingForm',pendingForm);

app.use('/api/realad',realad);



app.get('/',(req,res)=>{
    res.send('Hello world');
});

app.get('/course/:id',(req,res)=>{
    res.send(req.para);
});

app.get('/course',(req,res)=>{
    res.send(req.query);
});

const port=process.env.PORT || 3000;



app.listen(port,()=>{
    console.log('listing');
})