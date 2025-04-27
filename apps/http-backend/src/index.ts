import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { userMiddleware } from './middleware';
import {  CreateUserSchema , CreateRoomSchema, SigninSchema} from '@repo/common/common'
//import { PrismaClient }  from "../../../packages/db/src/generated/prisma"
 import { prismaClient }  from "@repo/db/client"

// const prismaClient=new PrismaClient();


const app=express();

app.use(express.json());

app.post('/signup',async function(req,res){
    
    const username=req.body.username;
    const password=req.body.password;
    const name=req.body.name;    
    const parsedData=CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.send({
            msg:"incorrect inputs"
        });return;
    } 
    //db entry 
    const user1=await prismaClient.user.findFirst({
        where:{
            username,
        }
    })

    if(user1){
        res.json({
            msg:"duplicate user Id created"
        });
    }

    
    const user=await prismaClient.user.create({
        data:{
            username,
            password,
            name
        }
    })

    res.json({
        userId:user.id,
        msg:"signup-done"
    })
    

})
app.post('/signin',async function(req,res){
    
    const username=req.body.username;
    const password=req.body.password;
    
    const user=await prismaClient.user.findFirst({
        where :{
            username,password
        }
    })

    if(!user){
        res.json({
           msg:"user not registered" 
        });
        return ;
    }

    //replace with entered userId of database;
    const token = jwt.sign({
        userId:user.id
    },JWT_SECRET);

    res.json({
        token
    });

    

})
app.post('/room',userMiddleware,async function(req,res){
    
    const nname=req.body.name;
    
    if(!nname){
        res.json({
            msg:"room name undefined"
        });
        return;
    }
    //@ts-ignore
    const userId=req.userId;
    if(!userId){
        res.json({
            msg:"user not signed in or some that sort error"
        });return;
    }
    const room =await prismaClient.room.create({
        data : {
           slug:nname,
           adminId:userId 
        }
    });
    //db enteries
     res.json({
        roomId:room.id
     });

})



app.listen(3003);

