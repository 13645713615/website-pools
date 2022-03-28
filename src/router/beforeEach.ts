/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-05 21:27:44
 * @LastEditTime: 2022-03-24 15:40:25
 */

import { useApp } from "@/store";
import { RouteLocationNormalized } from "vue-router";

export default async function ({ name, path, meta, matched, query, params, fullPath }: RouteLocationNormalized, from: RouteLocationNormalized) {
    console.log("[ROUTER] " + fullPath)
    const { active, $patch, loadPictures, loadSupportCoin } = useApp();
    if (active == false && matched.length) {
        try {
            await Promise.all([loadPictures(7), loadSupportCoin()]);
            $patch((state) => state.active = true)
        } catch (error) {
            return false
        }
    }

    return true
}

export function createbeforeEnter(beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean | Promise<boolean> | string | Promise<string>) {
    return async function (to: RouteLocationNormalized, from: RouteLocationNormalized) {
        try {
            const value: boolean | string = await beforeEnter(to, from);
            if (value === false) {
                throw ""
            }
            return value
        } catch (error) {
            return !from.name ? "/" : false
        }
    }
}
