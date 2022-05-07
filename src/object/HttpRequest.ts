/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-07-08 19:15:03
 * @LastEditTime: 2022-04-19 20:11:10
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from "axios"
import qs from 'qs';
import lzString from 'lz-string';
export { };

export interface IHttpConfig extends AxiosRequestConfig {
    whiteListed?: Array<number>;
    isPassRule?: (data: any) => boolean;
    handleError?: <T = any>(data: T) => T;
}
export interface IHttpOptions extends IHttpConfig {
    url?: string;
    meta?: Record<string, any>,
    cancel?: Canceler;
}

export interface IError {
    status?: number;
    message?: string;
    data?: any;
}

export interface ISecretConfig {
    url?: string;
    method?: string;
    params?: string;
}

export type TEvent = "create" | "start" | "end"


// 生命周期
const watchMuster: Map<TEvent, Function> = new Map();
// 工作列表
const worksList: Map<string, IHttpOptions> = new Map<string, IHttpOptions>();

export const onCreate = (callback: Function): void => {
    watchMuster.set("create", callback);
}
export const onStart = (callback: Function): void => {
    watchMuster.set("start", callback)
}
export const onEnd = (callback: Function): void => {
    watchMuster.set("end", callback)
}
// 判断超时
const isTimeout = (error: any) => {
    return error.code == "ECONNABORTED" && error.message && error.message.includes('timeout')
}
// 响应事件
const triggerEvent = (event: TEvent, ...args: any[]): undefined | Promise<any> => {
    const fn = watchMuster.get(event);
    if (typeof fn == "function") {
        try {
            const result = fn.apply(fn, args);
            if (result) return result
        } catch (error) {
            console.error("[HTTP] " + error)
            return Promise.reject();
        }
    }
}
// 增加工作
const addWorks = (key: string, options: any): undefined | Promise<any> => {
    worksList.set(key, options);
    return triggerEvent("create", key, options);
}
// 修改工作
export const setWorks = (key: string, options: any): void => {
    let content = worksList.get(key);
    worksList.set(key, Object.assign(content, options));
    triggerEvent("start", key, content, worksList.size);
}
// 查找工作
export const getWorks = (key: string): any => {
    return worksList.get(key);
}
// 工作是否存在
export const hasWorks = (key: string): boolean => {
    return worksList.has(key);
}
// 删除工作
export const delWorks = (key: string, config?: AxiosRequestConfig, data?: any, success?: boolean): void => {
    worksList.delete(key);
    triggerEvent("end", key, config, data, success, worksList.size);
}
// 取消工作
export const cancelWorks = (message: string, keys?: string): void => {
    if (keys) {
        const works = worksList.get(keys);
        works?.cancel && typeof works.cancel === 'function' && works.cancel(message);
        delWorks(keys);
    } else if (worksList.size) {
        for (let key in worksList) {
            const works = worksList.get(key);
            works?.cancel && typeof works.cancel === 'function' && works.cancel(message);
            delWorks(key);
        }
    }
}
// 创建请求
class CreateRequest<Options extends IHttpOptions> {
    constructor(config: IHttpConfig) {
        this.config = config;
        this.httpInstance = this.create(this.config);
        this.httpInstance.interceptors.request.use(this.interceptorsResponse.bind(this), this.interceptorsrError.bind(this));
        this.httpInstance.interceptors.response.use(this.interceptorsrRsponse.bind(this), this.interceptorsrError.bind(this));
    }
    // 配置
    public config: IHttpConfig;
    // http实例
    public httpInstance: AxiosInstance;
    // 创建http
    public create(config: AxiosRequestConfig): AxiosInstance {
        if (!config.paramsSerializer) {
            config.paramsSerializer = CreateRequest.paramsSerializer;
        }
        if (!config.transformRequest) {
            config.transformRequest = CreateRequest.transformRequest;
        }
        return axios.create(config);
    }
    // 通行证，默认全部通过
    private isPassRule(key: string, data: any): boolean {
        let config: Options = getWorks(key);
        const isPassRule = config.isPassRule || this.config.isPassRule || false;
        if (isPassRule) {
            return isPassRule(data)
        }
        return true
    };
    // 错误处理
    private handleError(key: string, data: any): any {
        let config: Options = getWorks(key);
        const handleError = config.handleError || this.config.handleError;
        if (handleError) {
            return handleError(data)
        }
        return data
    };
    // 建立唯一的key值
    static buildSecretKey(config: ISecretConfig): string {
        let key: string = config.url + "|" + config.method;
        if (config.params && typeof config.params == "object") {
            key += "?" + qs.stringify(config.params)
        }
        return lzString.compress(key);
    }
    // 对象转换formData
    static toFormData(object: Record<string, any>): FormData {
        const formData = new FormData();
        for (const key in object) {
            const item = object[key];
            if (Array.isArray(item)) {
                item.forEach(value => {
                    formData.append(key, value)
                })
            } else if (item instanceof FileList) {
                for (let index = 0; index < item.length; index++) {
                    formData.append(key, item.item(index) as File)
                }
            } else {
                formData.append(key, item)
            }
        }
        return formData;
    }
    // 负责 `params` 序列化的函数
    static paramsSerializer(params: object) {
        return qs.stringify(params, { arrayFormat: "brackets" })
    }
    // 在向服务器发送前，修改请求数据
    static transformRequest(data: object, headers: any): any {
        if (data instanceof FormData) {
            return data
        }
        if (headers["Content-Type"]) {
            if (headers["Content-Type"].includes("multipart/form-data")) {
                return CreateRequest.toFormData(data);
            } else if (headers["Content-Type"].includes("application/json")) {
                return JSON.stringify(data);
            }
        }
        // 默认 Content-Type: application/x-www-form-urlencoded
        return qs.stringify(data)
    }
    // 错误处理
    static explainError(error: AxiosError): IError {
        let data, status;
        if (axios.isCancel(error)) {
            //客户端取消请求
            status = 499;
        } else if (error.response) {
            //请求已发出，服务器用状态代码响应
            status = error.response.status;
            data = error.response.data
        } else if (isTimeout(error)) {
            status = 408;
            data = { status, path: error.config.url, error: "请求超时" }
        } else if (error.request) {
            //已提出请求，但未收到答复
            status = 500;
            data = error.request;
        }
        return { message: error.message, data, status }
    }
    // 请求拦截
    public interceptorsResponse(config: AxiosRequestConfig): AxiosRequestConfig {
        const key = CreateRequest.buildSecretKey(config);
        config.cancelToken = new axios.CancelToken((cancel: Canceler) => {
            setWorks && setWorks(key, { cancel });
        });
        return config;
    }
    // 请求响应拦截
    public interceptorsrRsponse({ data, config }: AxiosResponse): Promise<any> {
        const key = CreateRequest.buildSecretKey(config);
        if (this.isPassRule(key, data)) {
            delWorks(key, config, data, true);
            return Promise.resolve(data);
        }
        const error = this.handleError(key, data);
        delWorks(key);
        return Promise.reject(error);
    }
    // 请求错误
    public interceptorsrError(error: AxiosError): Promise<any> {
        try {
            const key = CreateRequest.buildSecretKey(error.config);
            error = this.handleError(key, CreateRequest.explainError(error));
            delWorks(key);
            return Promise.reject(error);
        } catch (error) {
            cancelWorks((error as Error).message);
            return Promise.reject(error);
        }
    }
    // 发起请求
    public request(options: Options): Promise<any> {
        const key = CreateRequest.buildSecretKey(options);
        if (hasWorks(key)) {
            cancelWorks("重复工作", key);
        }
        const works = addWorks(key, options)
        if (Object.prototype.toString.call(works) === "[object Promise]") return works;
        return this.httpInstance(options);
    }

    public get(url: string, options?: Options): Promise<any> {
        return this.request(Object.assign({ method: "get", url }, options));
    }

    public post(url: string, options?: Options): Promise<any> {
        return this.request(Object.assign({ method: "post", url }, options));
    }

    public put(url: string, options?: Options): Promise<any> {
        return this.request(Object.assign({ method: "put", url }, options));
    }

    public delete(url: string, options?: Options): Promise<any> {
        return this.request(Object.assign({ method: "delete", url }, options));
    }
}

export default CreateRequest