import axios, { AxiosResponse } from "axios";
import { IActivity } from "../../models/activity";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL='https://localhost:5001/api';
axios.interceptors.response.use(async r => {
    try {
        await sleep(1000);
        return r;
    } catch (er) {
        console.log(er);
        return await Promise.reject(er);
    }
});

const responseBody =<T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string,body: {}) => axios.post<T>(url,body).then(responseBody),
    put:<T> (url: string,body:{}) => axios.put<T>(url,body).then(responseBody),
    delete:<T> (url: string) => axios.delete<T>(url).then(responseBody),
 //get: (url: string) => axios.get(url).then(r => responseBody(r))
}

const Activities = {
    list : () => request.get<IActivity[]>('/Activities'),
    details:(id: string) => request.get<IActivity>(`/Activities/${id}`),
    create:(activity: IActivity) => request.post<void>('/Activities',activity),
    update:(activity: IActivity) => request.put<void>(`/Activities/${activity.id}`,activity),
    delete:(id: string) => request.delete<void>(`/Activities/${id}`),
}

const Agent = {
    Activities

}

export default Agent;