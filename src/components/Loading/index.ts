/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-07 22:15:35
 * @LastEditTime: 2022-03-08 14:33:04
 */

import { createApp } from "vue";
import Loading from "./Loading"
import "@assets/css/loading.css"
import { LoadingComponentInstance, LoadingProps, LoadingsMethod } from "./loading.type";

let $loading: LoadingComponentInstance = null

function parentNode(): Element {
    let node = document.querySelector("#loading")
    if (!node) {
        node = document.createElement("div");
        node.id = "loading"
        document.body.appendChild(node)
    }
    return node
}

function install(): void {
    if ($loading) return;
    $loading = createApp(Loading).mount(parentNode()) as LoadingComponentInstance
}

export function useLoading(porps: LoadingProps): LoadingsMethod {
    if (!$loading) install();
    const { $props, hide, show } = $loading
    Object.assign($props, porps);
    return { hide, show }
}

export default { install }