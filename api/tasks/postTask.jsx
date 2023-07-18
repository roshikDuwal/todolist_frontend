import { Axios, UpdateAxios } from "../../axios/axios"


export const  PostTask =(data)=>{
    const postTask = Axios.post("tasks/addtask",data)
    return postTask
}

export const  DeleteTask =(id)=>{
    const deleteTask = Axios.delete("tasks/" + id ,id)
    return deleteTask
}

export const  UpdateTask =(id)=>{
    const updateTask = UpdateAxios.put("tasks/" + id ,id)
    return updateTask
}