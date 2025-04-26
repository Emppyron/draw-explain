import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { userMiddleware } from './middleware';
import {  UserZSchema } from '@repo/common/common'
const app=express();

app.use(express.json());

app.post('/signup',function(req,res){
    
    const username=req.body.username;
    const password=req.body.password;
     
    //db entry 

    res.json({
        username,
        password
    })
    

})
app.post('/signin',function(req,res){
    
    const username=req.body.username;
    const password=req.body.password;
    
    //replace with entered userId of database;
    const token = jwt.sign({
        username
    },JWT_SECRET);

    res.json({
        token
    });

    

})
app.post('/room',userMiddleware,function(req,res){
    
    //db enteries
     res.json({
       room :"123"
     })

})



app.listen(3003);

