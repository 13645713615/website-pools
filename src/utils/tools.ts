/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-06-17 20:07:19
 * @LastEditTime: 2022-05-06 16:18:11
 */


/**
 * 判空
 */
export const isEmpty = (value: any): boolean => {
    switch (typeof value) {
        case 'undefined': return true;
        case 'string': if (value.trim().length == 0) return true; break;
        case 'boolean': if (!value) return true; break;
        case 'number': if (0 === value) return false; break;
        case 'object':
            if (null === value) return true;
            if (undefined !== value.length && value.length == 0) return true;
            for (let key in value) { return false; } return true;
            break;
    }
    return false;
}

/**
 * @name: 返回对象类型
 * @msg: 
 * @param {any} value
 * @return {*}
 */
export const objectType = (value: any): string => {
    const type = Object.prototype.toString.call(value)
    return type.substring(8, type.length - 1).toLocaleLowerCase()
}

/**
 * @name: 判断是否array
 * @msg: 
 * @param {any} value
 * @return {*}
 */
export const isArrary = (value: any): boolean => {
    return objectType(value) === 'array'
}


/**
 * @name: 
 * @msg: 判断是否object
 * @param {any} value
 * @return {*}
 */
export const isObject = (value: any): boolean => {
    return objectType(value) === 'object'
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




/**
 * @name: 对象循环
 * @msg: 
 * @param {Record} value
 * @param {*} any
 * @param {Function} callback
 * @return {*}
 */
export const objectForEach = (value: Record<string, any>, callback: Function): void => {
    if (isUndefined(value, callback)) {
        throw new Error("arguments of get undefined!");
    }
    if (!isObject(value)) {
        throw new Error("arguments does not say object type");
    }
    let index = 0;
    for (const key in value) {
        const item = value[key];
        callback(item, key, index++)
    }
}
/**
 * @name: 对象转换数组 
 * @msg: 
 * @param {any} value
 * @param {Function} format
 * @return {*}
 */
export const objectToArray = (value: Record<string, any>, format: (item: any, key: string, index: number) => void): Array<any> => {
    const list: Array<any> = [];
    objectForEach(value, (item: any, key: string, index: number) => {
        const content = format(item, key, index);
        if (content != undefined) {
            list.push(content)
        }
    })
    return list;
}

/**
 * @name: 对象map
 * @msg: 
 * @param {any} value
 * @param {Function} format
 * @return {*}
 */
export const objectMap = (value: Record<string, any>, format: (item: any, key: string, index: number) => void): Record<string, any> => {
    const list: Record<string, any> = {};
    objectForEach(value, (item: any, key: string, index: number) => {
        list[key] = format(item, key, index)
    })
    return list;
}


/**
 * @name: 查询数组 返回下标
 * @msg: 
 * @param {Array} list
 * @param {string} key
 * @param {function} format
 * @return {*}
 */
export const deepIndexOfArray = (list: Array<any>, key: string, format: (data: any) => boolean): Array<number> | null => {
    const size: number = list.length;
    for (let index = 0; index < size; index++) {
        const item = list[index];
        if (format(item)) {
            return [index]
        } else if (isObject(item) && item[key] && isArrary(item[key])) {
            const childIndex = deepIndexOfArray(item[key], key, format);
            if (childIndex) {
                return [index, ...childIndex]
            }
        }
    }
    return null;
}


export const repeatExecution = function (callback: Function, number: number) {
    let index = 0;
    return new Promise((resolve) => {
        setTimeout(() => {
            while (index++ < number) {
                callback()
            }
            resolve(null);
        }, 1)
    })
}


/**
 * @name: 查询数组返回父级
 * @msg: 
 * @param {Array} list
 * @param {string} key
 * @param {function} format
 * @return {*}
 */
export const deepParentOfArray = (list: Array<any>, key: string, format: (data: any) => boolean): Array<any> | null => {
    const size: number = list.length;
    for (let index = 0; index < size; index++) {
        const item = list[index];
        if (format(item)) {
            return list
        } else if (isObject(item) && item[key] && isArrary(item[key])) {
            const value = deepParentOfArray(item[key], key, format);
            if (value) {
                return value
            }
        }
    }
    return null;
}

/**
 * @name: 深度循环
 * @msg: 
 * @param {Array} list
 * @param {string} key
 * @param {function} fn
 * @return {*}
 */
export const deepForEach = <T = any>(list: Array<T>, key: string, format: (item: T, data?: T) => any, data?: T): void => {
    const size: number = list.length;
    for (let index = 0; index < size; index++) {
        const item = list[index];
        try {
            list[index] = format(item, data);
        } catch (error) {
            throw error
        }
        if (isObject(item) && (item as Record<string, any>)[key] && isArrary((item as Record<string, any>)[key])) {
            deepForEach((item as Record<string, any>)[key] as Array<T>, key, format, item);
        }
    }
}


/**
 * @name: 排序
 * @msg: 
 * @param {*} T
 * @return {*}
 */

export const sortArray = <T = any>(list: Array<T>, key: string, order: "ascend" | "descend" = "ascend"): Array<T> => {
    return [...list].sort(sortCompare(key, order));
}
const sortCompare = (key: string, order: "ascend" | "descend") => {
    switch (order) {
        case "ascend":
            return (a: Record<string, any>, b: Record<string, any>): number => {
                return a[key] - b[key]
            }
        case "descend":
            return (a: Record<string, any>, b: Record<string, any>): number => {
                return b[key] - a[key]
            }
        default:
            break;
    }

}

/**
 * @name: 拷贝
 * @msg: 
 * @param {*} T
 * @return {*}
 */
export const deepClone = (value: any): any => {
    let copy: any;

    if (null == value || "object" != typeof value) return value;

    if (value instanceof Date) {
        return value
    }

    // Handle Array
    if (value instanceof Array) {
        copy = [];
        for (var i = 0, len = value.length; i < len; i++) {
            copy[i] = deepClone(value[i]);
        }
        return copy;
    }

    // Handle Function
    if (value instanceof Function) {
        copy = function () {
            return value.apply(copy, arguments);
        }
        return copy;
    }

    // Handle Object
    if (value instanceof Object) {
        copy = {};
        for (var attr in value) {
            if (value.hasOwnProperty(attr)) copy[attr] = deepClone(value[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj as type isn't supported " + (value as object).constructor.name);
}


/**
 * @name: 数组转换🌲
 * @msg: 
 * @param {Array} data
 * @param {string} idKey
 * @param {string} parentIdKey
 * @return {*}
 */
export const arrayToTerr = (data: Array<any>, idKey: string, parentIdKey: string): Array<any> => {

    const root = new Map<number, any>();

    const idMapping = data.reduce<Record<number, number>>((previous, item, index) => {
        previous[item[idKey]] = index;
        return previous;
    }, {});

    data.forEach(item => {
        // 判断根节点
        if (!item[parentIdKey]) {
            root.set(item[idKey], item)
            return;
        }
        // 用映射表找到父元素
        const parentNode = data[idMapping[item[parentIdKey]]];
        if (parentNode) {
            // 把当前元素添加到父元素的`children`数组中
            parentNode.children = [...(parentNode.children || []), item];
        }
    });
    return [...root.values()]
}



/**
 * @name: 绑定事件 on(element, event, handler)
 * @msg: 
 * @param {Element} element
 * @param {string} event
 * @param {function} handler
 * @param {boolean} useCapture
 * @return {*}
 */
export const on = (function () {
    if (window.document.addEventListener != undefined) {
        return function (element: Element | Window, event: string, handler: (...args: any) => void, useCapture: boolean = false) {
            if (isUndefined.apply(isUndefined, arguments)) {
                throw new Error("arguments of set undefined!");
            }
            element.addEventListener(event, handler, useCapture)
        }
    } else {
        return function (element: any, event: string, handler: (...args: any) => void) {
            if (isUndefined.apply(isUndefined, arguments)) {
                throw new Error("arguments of set undefined!");
            }
            element.attachEvent('on' + event, handler)
        }
    }
})()



/**
 * @name: 解绑事件 off(element, event, handler)
 * @msg: 
 * @param {Element} element
 * @param {string} event
 * @param {function} handler
 * @return {*}
 */
export const off = (function () {
    if (window.document.addEventListener != undefined) {
        return function (element: Element | Window, event: string, handler: (...args: any) => void) {
            if (isUndefined.apply(isUndefined, arguments)) {
                throw new Error("arguments of set undefined!");
            }
            element.removeEventListener(event, handler, false)
        }
    } else {
        return function (element: any, event: string, handler: (...args: any) => void) {
            if (isUndefined.apply(isUndefined, arguments)) {
                throw new Error("arguments of set undefined!");
            }
            element.detachEvent('on' + event, handler)
        }
    }
})()


const units = ['', 'K', 'M', 'G', 'T', 'P', 'E']

/**
 * @name: 算力格式化
 * @msg: 
 * @param {any} hashrate
 * @param {string} unit
 * @param {number} decimals
 * @param {number} step
 * @return {*}
 */
export const formatHashrate = (hashrate: any, unit: string = 'H', decimals: number = 2, step: number = 1000): string => {
    let bytes = parseFloat(hashrate);
    if (isNaN(bytes)) {
        bytes = 0;
    }
    let i = 0;
    while (bytes >= step && i < units.length - 1) {
        bytes /= step;
        i++;
    }
    return `${bytes.toFixed(decimals)} ${units[i]}${unit}`
}

export const formatHashrateUnit = (hashrate: string | number, unit: string) => {
    let bytes = Number(hashrate);
    if (isNaN(bytes)) {
        bytes = 0;
    }
    const i = units.findIndex(u => u === unit);
    bytes /= Math.pow(1000, i)
    return `${toFixed(bytes, 2)} ${unit}H`
}


/**
 * @name: 获取字母
 * @msg: 
 * @param {string} value
 * @return {*}
 */
export const strPure = function (value: string): string {
    return value.replace(/[^a-z]+/ig, "").toLocaleLowerCase()
}


/**
 * @name: 防抖
 * @msg: 
 * @param {Function} callback
 * @param {number} time
 * @return {*}
 */
export const debounce = function (callback: Function, time: number) {
    let timeId: NodeJS.Timeout = null
    return function (...args: any[]) {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => callback.apply(callback, args), time);
    }
}

/**
 * @name: 节流
 * @msg: 
 * @param {Function} callback
 * @param {number} time
 * @return {*}
 */
export const throttle = function <T extends (...args: any) => void>(callback: T, time: number): (...args: Parameters<T>) => ReturnType<T> {
    let timeId: NodeJS.Timeout = null
    return function (...args) {
        if (timeId) return;
        timeId = setTimeout(() => { timeId = null }, time);
        return callback.apply(callback, args);
    }
}



/**
 * @name: 创建一个弱类型
 * @msg: 
 * @param {Function} listener 实例
 * @param {function} destroy 销毁回掉
 * @return {function}
 */
export const addWeakListener = function <T extends (...args: any[]) => any>(listener: T, destroy?: (wrapper) => void) {
    const weakRef = new WeakRef(listener);
    const wrapper = (...args: Parameters<T>): ReturnType<T> | undefined => {
        const self = weakRef.deref()
        if (self) return self.apply(self, args) as ReturnType<T>;
    }
    if (destroy) {
        new FinalizationRegistry(({ self }) => { destroy(self) }).register(wrapper, { wrapper });
    }

    return wrapper
}


/**
 * @name: copy
 * @msg: 
 * @param {string} value
 * @return {*}
 */
export function copyText(value: string): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
        let oInput = document.createElement('input'), isSuccess = false
        oInput.className = "hidden"
        oInput.value = value;
        document.body.appendChild(oInput);
        oInput.select();
        isSuccess = document.execCommand("Copy")
        oInput.remove()
        isSuccess ? resolve({ message: "复制成功" }) : reject({ message: "您的浏览器暂不支持此功能" })
    })
}


/**
 * @param {*} object 对象
 * @description 对象去空
 */
export function objNoNempty<T extends Record<string, any>>(object: T, term = ['', null, undefined]): T {
    for (const key in object) {
        if (term.indexOf(object[key]) > -1) {
            delete object[key]
        }
    }
    return object
}


/**
 * @name: 乘法
 * @msg: 
 * @param {number} a
 * @param {number} b
 * @return {*}
 */
export function mul(a: number, b: number): number {
    let c = 0, d = a.toString(), e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) { }
    try {
        c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}


/**
 * 除法
 */
export function div(a: number | string, b: number | string): number {
    let c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) { }
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) { }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}


/**
 * @name: 时间状态
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function getTimeState(): "morning" | "noon" | "afternoon" | "night" | undefined {
    const hours = new Date().getHours()
    if (hours >= 0 && hours <= 10) {
        return 'morning';
    } else if (hours > 10 && hours <= 14) {
        return 'noon';
    } else if (hours > 14 && hours <= 18) {
        return 'afternoon';
    } else if (hours > 18 && hours <= 24) {
        return 'night';
    }
}


/**
 * @name: 判断数组是否全部有值
 * @msg: 
 * @param {T} array
 * @return {*}
 */
export function arrIsNoEmpty<T extends Array<any>>(array: T): boolean {
    return array.every((item) => !isEmpty(item))
}


/**
 * @name: 获取语言 默认en
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function getLanguage(): string {
    switch (navigator.language) {
        case "zh-CN":
        case "zh-CHS":
        case "zh-HK":
        case "zh-MO":
        case "zh-SG":
        case "zh-TW":
        case "zh":
            return "zh"
        default:
            return "en"
    }
}


export function at<T extends Array<any>>(value: T, index: number) {
    const length = value.length;
    if (Math.sign(index) === -1) {
        return value[length + index]
    }
    return value[index]
}


export function toFixed(value: number | string, size: number = 6): number {
    try {
        return Number(value.toString().match(new RegExp(`\^\\d+(?:\\.\\d{0,${size}})?`)))
    } catch (error) {
        console.warn(error)
        return Number(value)
    }
}
