import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";


const wss= new WebSocketServer({port:8080});

wss.on("connection",function(socket,request){
    
    const url= request.url;
    if(!url){
        return;
    }
    const queryParams= new URLSearchParams(url.split('?')[1]);
    const token=queryParams.get("token");
    if(token==null){
        socket.close();return;
    }
    const decoded=jwt.verify(token,JWT_SECRET);
    //@ts-ignore
    if(!decoded || !(decoded as JwtPayload).userId){
          socket.close();return;
     }     


    socket.on('message',(e)=>{
        socket.send(e.toString());
    })


})