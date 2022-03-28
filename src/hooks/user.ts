/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 09:56:19
 * @LastEditTime: 2022-03-25 16:22:39
 */

import router from "@/router";
import { signOut } from "@/service/api";
import { useUser } from "@/store";


/**
 * @name: 是否是游客
 * @msg: 
 * @param {T} ifSolots
 * @param {T} elseSolots
 * @return {*}
 */
function userVisitoRender<T = any>(ifSolots: T, elseSolots?: T): T {
    const { getToken } = useUser();
    return !getToken ? ifSolots : elseSolots
}

function useLogout() {
    const { getToken } = useUser();
    if (getToken) {
        signOut(getToken)
    }
    router.push({ name: "login", query: { redirect: location.pathname } }).then(() => {
        useUser().$reset();
    })
}

export { userVisitoRender, useLogout }