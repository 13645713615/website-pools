/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-07-22 11:26:14
 * @LastEditTime: 2022-03-28 15:49:46
 */

import { IHttpOptions } from "@/object/HttpRequest";
import { UnwrapRef } from "vue";

export interface IRes<T = any> {
    data?: T;
    ext?: Record<string, any>;
    message: string;
    status: string | number;
}
export interface IPage<T> {
    current: number;
    pages: number;
    records: Array<T>;
    size: number;
    total: number;
}

export interface IServiceOptions<T> {
    params?: any;
    defaultValue: T;
    immediate?: boolean;
}
export interface IServiceData<T> {
    run(params?: any, callback?: (res: T) => void): void;
    loading: boolean;
    data: T
}

export interface IServiceReactiveData<T> {
    run(params?: any, callback?: (res: T) => void): void;
    loading: boolean;
    data: UnwrapRef<T>
}

export class Page<T> implements IPage<T>{
    public current: number = 0;
    public pages: number = 0;
    public records: Array<T> = [];
    public size: number = 0;
    public total: number = 0;
}


export interface HttpOptionsMeta {
    loading?: boolean,
    cache?: boolean | "app" 
}

export interface HttpOptions extends IHttpOptions {
    meta?: HttpOptionsMeta,
}

export interface IResPromise<T> extends Promise<IRes<T>> { }
