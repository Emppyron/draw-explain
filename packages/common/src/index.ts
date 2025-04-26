import { z } from "zod";

export const UserZSchema= z.object({
    username:z.string(),
    password:z.string(),
    fullName:z.string(),
})