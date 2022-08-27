import axios, { AxiosResponse } from "axios";
import environment from '../conf/environment'

export const connect: (username: string, password: string) => (Promise<AxiosResponse<any, any>>) = (username: string, password: string) => {
    return axios.get(environment.apiBaseURL, {
        headers: {
            authorization: `Basic ${window.btoa(username + ':' + password)}`
        }
    });
};

export const logOut = () => {
    window.localStorage.removeItem('token');
}

export const save: (token: string) => void = (token: string) => {
    window.localStorage.setItem("token", token)
}

export const HEADER_AUTH = () => ({
    authorization: `Basic ${window.localStorage.getItem("token") || ''}`,
})
