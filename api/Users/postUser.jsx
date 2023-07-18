import {Axios} from "../../axios/axios"

export const RegisterUser=(users)=>{
    const registeruser=Axios.post("/users/register",users)
    return registeruser
}


export const LoginUser=(users)=>{
    const loginuser=Axios.post("/users/login",users)
    return loginuser
}