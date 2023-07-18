import axios from "axios"
import { version_domain } from "../config/Url"

export const Axios = axios.create({

    baseURL:version_domain,
    withCredentials:true,
    headers: {
        "Content-Type": "application/json",
      },
})


export const UpdateAxios = axios.create({
  baseURL:version_domain,
  withCredentials:true,
})


