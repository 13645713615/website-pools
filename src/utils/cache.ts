/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 17:01:30
 * @LastEditTime: 2022-03-24 11:51:01
 */

import Cache from "@/object/Cache"

export enum Constant {
    Local
}

const cache = new Cache({}, 12);

export function localRead<T = any>(key: string | number, bol: boolean = true): T | undefined {
    return cache.get(String(key), bol)
}

export function localSave(key: string | number, value: any, bol: boolean = true): void {
    cache.set(String(key), value, bol)
}


export function localReadForever<T = any>(key: string): T | undefined {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        return
    }
}

export function localSaveForever(key: string, value: Record<string, any> | Array<any>): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export class CacheStorage implements Storage {

    protected cache: Cache;

    constructor(hour: number = 1) {
        this.cache = new Cache({}, hour)
    }

    public get length() {
        return localStorage.length
    }

    public clear() {
        this.cache.clear(null, true)
    }
    public getItem(key: string) {
       return this.cache.get(key, true)
    }
    public key(index: number) {
        return localStorage.key(index)
    }
    public removeItem(key: string) {
        this.cache.clear(key, true)
    }
    public setItem(key: string, value: string) {
        this.cache.set(key, value, true)
    }
}