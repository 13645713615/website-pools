/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-07-14 17:52:08
 * @LastEditTime: 2022-03-26 20:14:28
 */

import { reactive, shallowReactive, UnwrapNestedRefs, UnwrapRef } from "vue";
import { IRes, IServiceData, IServiceOptions, IServiceReactiveData } from "@/service/IService";
export * from "@/service/IService"

/**
 * @name: 通用
 * @msg: 
 * @param {*} T
 * @return {*}
 */
export const useService = <T = any>(service: Function, options: IServiceOptions<T>, callback?: (data: T, res: IRes<T>) => void): IServiceData<T> => {
    const state = shallowReactive({
        data: options.defaultValue,
        loading: false,
        run: function (params: any = options.params, callbacks?: (res: T) => void) {
            this.loading = true;
            const _params = typeof params === "function" ? params() : params;
            service(_params).then((res: IRes<T>) => {
                this.data = res.data || options.defaultValue;
                callback && callback(this.data, res);
            }).catch((res: IRes<T>) => {
                this.data = options.defaultValue;
                callback && callback(this.data, res);
            }).finally(() => {
                this.loading = false;
                callbacks && callbacks(this.data);
            })
        }
    });
    if (options.immediate) {
        state.run(options.params);
    }
    return state
}


/**
 * @name: ReactiveService
 * @msg: 
 * @param {*} T
 * @return {*}
 */
export const useReactiveService = <T = any>(service: Function, options: IServiceOptions<T>, callback?: (data: T, res: IRes<T>) => void): IServiceReactiveData<T> => {
    const state = reactive({
        data: options.defaultValue,
        loading: false,
        run: function (params: any = options.params, callbacks?: (res: T) => void) {
            this.loading = true;
            const _params = typeof params === "function" ? params() : params;
            service(_params).then((res: IRes<T>) => {
                this.data = res.data || options.defaultValue;
                callback && callback(this.data, res);
            }).catch((res: IRes<T>) => {
                this.data = options.defaultValue;
                callback && callback(this.data, res);
            }).finally(() => {
                this.loading = false;
                callbacks && callbacks(this.data);
            })
        }
    });
    if (options.immediate) {
        state.run(options.params);
    }
    return state
}