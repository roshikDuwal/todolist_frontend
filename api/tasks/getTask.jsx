import { Axios } from "../../axios/axios"


export const  GetTask =()=>{
    const getTask = Axios.get("tasks/gettask")
    return getTask
}

