/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-07-08 20:05:35
 * @LastEditTime: 2022-03-22 14:38:56
 */
import CreateRequest, { onCreate, onStart, onEnd, IHttpOptions, cancelWorks } from "@/object/HttpRequest";
import { IRes } from "./IService";
import locale from "@/locale"
import { useLoading } from "@/components/Loading";
import { useNotification } from "naive-ui";
import { localSave, localRead } from "@/utils/cache";
import { useLogout } from "@/hooks";
import { useUser } from "@/store";
import { isEmpty } from "@/utils/tools";
// 白名单
const whiteListed: Array<number | string> = [200, "200"];
const loadingWorks = new Set();
const loading = useLoading({});
const $t = locale.global.t;


const useRequest = new CreateRequest({
    timeout: 20000,
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    isPassRule: (data: IRes): boolean => {
        return whiteListed.includes(data.status)
    },
    handleError: (res: any) => {
        const state = Number(res.status);
        if (state === 403) {
            cancelWorks("登录失效");
            useLogout();
        } else if (state === 499) {
            console.warn(res.message);
        } else if (state >= 500 || state === 408) {
            useNotification()?.error({ title: $t("tip.requestFail"), content: res.manager })
        } else {
            // window.$message?.warning(res.message || $t("tip.requestError"))
            console.error(res.message)
        }
        return res
    }
})
onCreate((key: string, options: IHttpOptions): Promise<any> | undefined => {
    const { cache, loading } = options.meta || {}
    if (cache) {
        const data = localRead(key, true);
        if (data) return Promise.resolve(data)
    }
    if (loading === undefined || loading) {
        loadingWorks.add(key)
    }
    const { getToken } = useUser();
    if (getToken) {
        // const Authorization = "Bearer " + getToken;
        if (isEmpty(options.headers)) options.headers = {};
        options.headers.token = getToken
    }
})
onStart(() => {
    if (loadingWorks.size) {
        loading.show()
    }
})
onEnd((key: string, options?: IHttpOptions, res?: any, success?: boolean) => {
    console.log("[LOADING] " + loadingWorks.size);
    loadingWorks.delete(key)
    if (loadingWorks.size === 0) {
        loading.hide()
    }
    if (options?.meta?.cache && success) {
        localSave(key, res, true)
    }
})

export default useRequest