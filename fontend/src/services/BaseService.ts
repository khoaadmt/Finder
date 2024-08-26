import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../interface";

class BaseService {
    private readonly baseUrl: string;
    private readonly http: AxiosInstance;
    private readonly configHeaders: any;

    constructor(baseUrl: string, configHeaders: any) {
        this.http = axios.create({
            baseURL: baseUrl,
            timeout: 100000,
            withCredentials: true,
        });
        this.baseUrl = baseUrl;
        this.configHeaders = configHeaders;

        this.http.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                const { response } = error;
                if (response) {
                    switch (response.status) {
                        case 401:
                            localStorage.clear();
                            window.location.reload();
                            return;
                        case 403:
                            window.location.href = "/error403";
                            return;
                        default:
                            return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    setConfigHeaders(token?: string) {
        const headers: any = {
            "Content-Type": "application/json",
            ...this.configHeaders,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return { headers };
    }

    get(url: string, configHeaders: any = {}, token?: string) {
        return this.http.get(url, { ...this.setConfigHeaders(token), ...configHeaders });
    }

    post(url: string, data: any, configHeaders: any = {}, token?: string) {
        return this.http.post(url, data, { ...this.setConfigHeaders(token), ...configHeaders });
    }

    put(url: string, data: any, configHeaders: any = {}, token?: string) {
        return this.http.put(url, data, { ...this.setConfigHeaders(token), ...configHeaders });
    }

    delete(url: string, configHeaders: any = {}, token?: string) {
        return this.http.delete(url, { ...this.setConfigHeaders(token), ...configHeaders });
    }
}

export default BaseService;
