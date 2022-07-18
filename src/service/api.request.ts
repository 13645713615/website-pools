/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-07-08 20:05:35
 * @LastEditTime: 2022-07-18 17:10:46
 */
import CreateRequest, { onCreate, onStart, onEnd, cancelWorks } from "@/object/HttpRequest";
import { HttpOptions as Options, IRes } from "./IService";
import locale from "@/locale"
import { useLoading } from "@/components/Loading";
import { useMessage, useNotification } from "naive-ui";
import { localSave, localRead } from "@/utils/cache";
import { useLogout } from "@/hooks";
import { useApp, useUser } from "@/store";
import { isEmpty } from "@/utils/tools";
// 白名单
const whiteListed: Array<number | string> = [200, "200"];
const loadingWorks = new Set();
const loading = useLoading({});
const $t = locale.global.t;



const useRequest = new CreateRequest<Options>({
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
            // res.message?.toString() || $t("tip.requestError")

            // window.$message?.warning(res.message || $t("tip.requestError"))
            console.error(res.message)
        }

        return res
    }
})
onCreate((key: string, options: Options): Promise<any> | undefined => {
    const { cache, loading } = options.meta || {}

    if (cache) {
        const data = localRead(key, getCacheType(cache));
        if (data) return Promise.resolve(data)
    }

    if (loading === undefined || loading) {
        loadingWorks.add(key)
    }

    const { getToken } = useUser();

    const { language } = useApp();

    if (isEmpty(options.headers)) options.headers = {};

    options.headers["languageType"] = language == "zh" ? "ZhCn" : "EnUs";
    options.headers["Accept-Language"] = language;

    if (getToken) options.headers["token"] = getToken;
})
onStart(() => {
    if (loadingWorks.size) {
        loading.show()
    }
})
onEnd((key: string, options?: Options, res?: any, success?: boolean) => {
    console.log("[LOADING] " + loadingWorks.size);
    loadingWorks.delete(key)
    if (loadingWorks.size === 0) {
        loading.hide()
    }
    if (options?.meta?.cache && success) {
        localSave(key, res, getCacheType(options.meta.cache))
    }
})

function getCacheType(cache): boolean {
    return cache === true
}

export default useRequest