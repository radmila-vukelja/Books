import { Role } from "./role";

export interface User {
    id: any,
    firstName: string, 
    lastName: string,
    email: string,
    username: string,
    password: string,
    role: Role | string
}