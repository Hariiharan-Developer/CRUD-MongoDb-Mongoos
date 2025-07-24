const express = require('express');
const app =express();
const bodyParser =require('body-parser');
const exhbs =require('express-handlebars');
const dbo = require('./db');
const ObjectId =dbo.ObjectId;


app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:'main',extname:'hbs'})) ;
app.set('view engine','hbs');//setting which template ingin used
app.set('views' ,'views')
app.use(bodyParser.urlencoded({extended:true})) // geting input from user


// READ Operation :
app.get('/',async(req,res)=>{
let database =await dbo.getDatabase();
const collection =database.collection('list1');
const cursor = collection.find({})
const employees =await cursor.toArray();

let message ='';
let edit_id,edit_movie;

if(req.query.edit_id){
    edit_id =req.query.edit_id;
    edit_movie=await collection.findOne({_id: new ObjectId(edit_id)})
}


switch (req.query.status) {
    case 1:
        message='Inserted Succesfully'
        break;

    default:
        break;
}

    res.render('main',{message,employees,edit_id,edit_movie})
})


//CREATE Operation:
app.post('/store_movie',async(req,res)=>{
    let database= await dbo.getDatabase();
    const collection =database.collection('list1');
    let list = {title: req.body.title, author :req.body.author}
    await collection.insertOne(list)
    return res.redirect('/?status=1');

})


app.listen(8000,()=>{
    console.log(`server listening to :http://localhost:8000`);
    
})



