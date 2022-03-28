/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 16:08:03
 * @LastEditTime: 2022-03-24 15:41:15
 */
import { createRouter, createWebHashHistory, createWebHistory, RouteLocationNormalized } from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes';
import 'nprogress/nprogress.css'
import handleBeforeEach from "./beforeEach"
import locale from "@/locale"
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
const history = import.meta.env.DEV ? createWebHashHistory() : createWebHistory(import.meta.env.VITE_APP_BASE);

const router = createRouter({ history, routes })

router.beforeEach((): boolean => {
    NProgress.start()
    return true
})

router.beforeEach(handleBeforeEach)

router.beforeResolve(({ meta }: RouteLocationNormalized) => {
    document.title = locale.global.t(meta.title as string)
})

router.afterEach(() => {
    NProgress.done()
    window.scrollTo(0, 0)
})

export default router