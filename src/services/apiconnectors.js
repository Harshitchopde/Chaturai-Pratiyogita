import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method,
        url,
        bodyData:bodyData?bodyData:null,
        headers:headers?headers:null,
        params:params?params:null
    })
}