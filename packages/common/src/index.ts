import { z } from "zod";

export const CreateUserSchema= z.object({
    username:z.string().min(2).max(30),
    password:z.string(),
    fullName:z.string(),
})

export const  SigninSchema=z.object({
    username:z.string().min(2).max(30),
    password:z.string()
})


