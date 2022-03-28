/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 22:36:52
 * @LastEditTime: 2022-03-05 22:20:42
 */

import { createPinia } from "pinia";
import { App } from "vue";
import { useApp } from "./global/app";
import { useUser } from "./global/user";
export { useApp,useUser}
import piniaPluginPersist from 'pinia-plugin-persist'

export default function setupStore(app: App<Element>){
    const pinia = createPinia();
    pinia.use(piniaPluginPersist);
    app.use(pinia);
}



