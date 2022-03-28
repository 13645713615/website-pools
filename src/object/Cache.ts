/*
 * @Descripttion: 数据存储
 * @version: 
 * @Author: Carroll
 * @Date: 2021-06-18 10:06:03
 * @LastEditTime: 2022-03-24 11:53:39
 */
class Cache {
    public dataPools: any;
    public hour: number;
    public millisecond: number;
    public storage: Storage;
    constructor(data: any = {}, hour: number = 1, storage: Storage = localStorage) {
        this.dataPools = data
        this.hour = hour
        this.millisecond = this.hour * 3600000
        this.storage = storage
    }
    /**
     * @msg: 存储
     * @param {string} key
     * @param {any} data
     * @param {boolean} bol
     * @return {*}
     */
    set(key: string, data: any, bol: boolean = false): void {
        if (isUndefined(key, data)) {
            throw new Error("arguments of set undefined!");
        }
        if (bol) {
            this.storage.setItem(key, JSON.stringify({ value: data, expirse: new Date().getTime() + this.millisecond }))
        } else {
            this.dataPools[key] = data
        }
    }
    /**
     * @msg: 获取
     * @param {string} key
     * @param {boolean} bol
     * @return {*}
     */
    get(key: string, bol: boolean = false): any {
        if (isUndefined(key)) {
            throw new Error("arguments of get undefined!");
        }
        if (bol) {
            let data = null;
            try {
                data = JSON.parse(this.storage.getItem(key) as string)
            } catch (error) {
                console.error(error)
            }
            if (data && data.expirse != null) {
                if (data.expirse < new Date().getTime()) {
                    this.clear(key, true);
                    return
                } else {
                    return data.value;
                }
            }
        } else {
            return this.dataPools[key]
        }
        return
    }
    /**
     * @msg: 清除
     * @param {string} key
     * @param {boolean} bol
     * @return {*}
     */
    clear(key: string | null, bol: boolean = false): void {
        if (isUndefined(key)) {
            if (bol) {
                this.storage.clear()
            } else {
                this.dataPools = {}
            }
        } else {
            if (bol) {
                this.storage.removeItem(key as string)
            } else {
                delete this.dataPools[key as string]
            }
        }
    }
}

/**
 * @msg: 判断是否为Undefined，可多值
 * @param {array} args
 * @return {*}
 */
const isUndefined = function (...args: any[]): boolean {
    for (let index = 0; index < args.length; index++) {
        if (typeof (args[index]) === 'undefined') {
            return true;
        }
    }
    return false;
}

export default Cache