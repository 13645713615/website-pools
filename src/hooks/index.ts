/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 13:43:34
 * @LastEditTime: 2022-03-22 09:57:08
 */

import { Emiter } from "@/object/Emiter";
import { findDataByAddress } from "@/service/api";
import { useApp } from "@/store";
import { bgColor } from "@/store/global/app";
import { div } from "@/utils/tools";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onBeforeUnmount, reactive, UnwrapNestedRefs } from "vue";
export * from "./resize"
export * from "./service"
export * from "./user"
/**
 * @name: 临时修改底部背景
 * @msg: 
 * @param {bgColor} color
 * @return {*}
 */
function useTemporaryFooterBgColor(color: bgColor) {
    const { setFooterBgColor, footerBgColor } = useApp();
    setFooterBgColor(color);
    onBeforeUnmount(() => {
        setFooterBgColor(footerBgColor)
    })
}

/**
 * @name: 监听
 * @msg: 
 * @param {*}
 * @return {*}
 */
function useEmiter<T extends string | number>(): Emiter<T> {
    return new Emiter<T>()
}


async function useWalletToken(coin: string, wallet: string): Promise<any> {
    try {
        const { data: { isAccount, tmptoken } } = await findDataByAddress(coin, wallet)
        if (isAccount != 1) return Promise.reject();
        return tmptoken
    } catch (error: any) {
        return Promise.reject(error)
    }
}

/**
 * @name: 货币汇算
 * @msg: 
 * @param {*}
 * @return {*}
 */
function useExchange(): (value: number | string) => ComputedRef<number> {
    const { financeExchange, currency } = storeToRefs(useApp());
    return (value) => {
        return computed(() => {
            if (currency.value == "人民币" || !financeExchange.value.has(currency.value)) {
                return Number(Number(value).toFixed(2));
            }
            return Number(div(value, financeExchange.value.get(currency.value)).toFixed(2))
        })
    }
}



/**
 * @name: 重新绑定对象里面函数this
 * @msg: 
 * @param {T} object
 * @return {*}
 */
function useFnReactive<T extends Record<string, any>>(object: T): UnwrapNestedRefs<T> {
    const proxy = reactive<T>(object);
    let keys: Array<keyof T> = Object.keys(object);
    if (object.__proto__.constructor != Object) {
        keys = Array.from(new Set(keys.concat(Object.getOwnPropertyNames(object.__proto__))))
    }
    keys.forEach((key) => {
        if (typeof proxy[key] === "function" && key != "constructor") {
            proxy[key] = proxy[key].bind(proxy)
        }
    })
    return proxy
}

export { useTemporaryFooterBgColor, useWalletToken, useEmiter, useExchange, useFnReactive }