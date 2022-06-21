/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 13:43:34
 * @LastEditTime: 2022-06-21 16:07:54
 */

import { Emiter } from "@/object/Emiter";
import { findDataByAddress } from "@/service/api";
import { useApp } from "@/store";
import { bgColor } from "@/store/global/app";
import { div } from "@/utils/tools";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onBeforeUnmount, reactive, Ref, ref, unref, UnwrapNestedRefs, UnwrapRef, watch, watchEffect } from "vue";
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

function usePathname(): string {
    let pathname = location.pathname;
    if (import.meta.env.DEV) {
        pathname = location.hash.replace("#", "");
    }
    return pathname
}

function useLocation(index?: number): string | string[] {
    let pathname = usePathname();
    if (pathname.length && pathname.charAt(0) === "/") {
        pathname = pathname.substring(1)
    }
    const paths = pathname.split("/");
    if (index != undefined) {
        return paths[index] || ""
    }
    return paths
}

/**
 * 按需加载
 * @param  {()=>unknown} observe
 * @param  {()=>T} callback
 */
function useLoadDemand<T>(sources: () => unknown, callback: () => T): Ref<T> {
    const load = ref<T>();
    const unWatch = watch(sources, watchCallback);
    function watchCallback(value) {
        if (!!value) {
            load.value = callback();
            unWatch()
        }
    }
    watchCallback(sources());
    return load
}


export function useModel<T>(getter: () => T, emitter?: (value: UnwrapRef<T>) => void) {
    const state = ref(getter()) as Ref<T>
    watchEffect(() => emitter?.call(null, state.value))
    watch(getter, (value) => state.value = unref<T>(value))
    return state
}

export { useTemporaryFooterBgColor, useWalletToken, useEmiter,useLoadDemand, useExchange, useFnReactive,usePathname, useLocation }