import {Axios} from "../../axios/axios"

export const LogoutUser=()=>{
    const logoutuser=Axios.get("/users/logout")
    return logoutuser
}

export const UserProfile=()=>{
    const userprofile=Axios.get("/users/profile")
    return userprofile
}
