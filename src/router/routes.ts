/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 16:10:44
 * @LastEditTime: 2022-03-25 17:45:36
 */


import { useWalletToken } from '@/hooks'
import Main from '@/layout/Main'
import { useUser } from '@/store';
import { createbeforeEnter } from './beforeEach';
import { TRoutesRaw } from './router.types'

const routes: TRoutesRaw[] = [
    {
        path: '/',
        name: "index",
        redirect: "home",
        component: Main,
        children: [
            {
                path: '/home',
                name: "home",
                component: () => import('@/views/Home'),
                meta: {
                    title: "route.home"
                }
            },
            {
                path: '/blocks',
                name: "blocks",
                component: () => import('@/views/Blocks'),
                meta: {
                    title: "route.blocks"
                }
            },
            {
                path: '/miner/:coin/:wallet',
                name: "miner",
                component: () => import('@/views/Miner'),
                meta: {
                    title: "route.miner"
                },
                beforeEnter: createbeforeEnter(async (to) => {
                    const { params: { coin, wallet, token } } = to;
                    if (token) return true
                    const tmptoken = await useWalletToken(coin as string, wallet as string);
                    to.params.token = tmptoken as string
                    return true
                })
            },
            {
                path: '/miners',
                name: "miners",
                component: () => import('@/views/Miners'),
                meta: {
                    title: "route.miners"
                }
            },
            {
                path: '/statistics',
                name: "statistics",
                component: () => import('@/views/Statistics'),
                meta: {
                    title: "route.statistics"
                }
            },
            {
                path: '/started',
                name: "started",
                component: () => import('@/views/Started'),
                meta: {
                    title: "route.started"
                }
            },
            {
                path: '/started/:coin/GPU',
                name: "GPU",
                component: () => import('@/views/GPU'),
                meta: {
                    title: "route.gpu"
                }
            },
            {
                path: "/login",
                name: "login",
                component: () => import("@/views/Login"),
                meta: {
                    title: "route.login"
                }
            },
            {
                path: "/register",
                name: "register",
                component: () => import("@/views/Register"),
                meta: {
                    title: "route.register"
                }
            },
            {
                path: "/forget",
                name: "forget",
                component: () => import("@/views/Forget"),
                meta: {
                    title: "route.forget"
                }
            },
            {
                path: "/console",
                name: "console",
                component: () => import("@/layout/Console"),
                meta: {
                    title: "route.console",
                    visitor: true
                },
                beforeEnter: createbeforeEnter(async () => {
                    const { active, $patch } = useUser()
                    if (!active) {
                        await useUser().loadUsersCoins()
                        $patch((state) => state.active = true)
                    }
                    return true
                }),
                children: [
                    {
                        path: "/setup",
                        name: "setup",
                        component: () => import("@/views/Setup"),
                        meta: {
                            title: "route.setup",
                            visitor: true
                        }
                    },
                    {
                        path: "/acount",
                        name: "account",
                        component: () => import("@/views/Account"),
                        meta: {
                            title: "route.account",
                            visitor: true
                        }
                    },
                    {
                        path: "/extract",
                        name: "extract",
                        component: () => import("@/views/Extract"),
                        meta: {
                            title: "route.extract",
                            visitor: true
                        }
                    },
                    {
                        path: '/state/:coin/:wallet',
                        name: "state",
                        component: () => import('@/views/Miner'),
                        meta: {
                            title: "route.miner",
                            visitor: true
                        },
                        beforeEnter: createbeforeEnter(async (to) => {
                            const { getToken } = useUser()
                            if (getToken) {
                                to.params.token = getToken;
                                return true
                            }
                            return false
                        })
                    },
                ]
            }
        ]
    }
]



export default routes