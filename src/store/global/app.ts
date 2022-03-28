/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 23:18:13
 * @LastEditTime: 2022-03-27 14:22:57
 */

import { defineStore } from "pinia";
import { localRead, localSave, Constant } from "@/utils/cache";
import { dispatch as dispatchLocale } from "@/locale";
import { getFinanceExchange, getNotice, getPictures, supportCoin } from "@/service/api";
import { CacheStorage } from "@/utils/cache"
import { TCurrency } from "@/service/api.types";
import languages from "@/locale/lang"
import { getLanguage } from "@/utils/tools";

const IMAGES_BASE = import.meta.env.VITE_APP_IMAGES_BASE + "/";

export type bgColor = "white" | "black";

export interface IState {
    // 国际语言
    language: string,
    // 菜单抽屉
    collapsed: boolean,
    // footer 背景颜色
    footerBgColor: bgColor,
    // 激活
    active: boolean,
    // 所有币种图片
    pictures: Map<number, Record<any, any>>,
    // 支持的币种
    supportCoin: Array<string>,
    // 币种
    coin: string | null,
    // 消息
    // Set<number>
    notices: number[],
    // 人民币外汇率
    financeExchange: Map<TCurrency, number>,
    // 当前使用货币
    currency: TCurrency | "人民币" | null,
}

export interface IActions {
    setLanguage(lang: string): Promise<boolean>,
    setCollapsed(value: boolean): void,
    setFooterBgColor(color: bgColor): void,
    loadPictures: (type: number) => Promise<any>,
    loadSupportCoin: () => Promise<any>,
    getNotice: () => Promise<false | Array<Record<string, any>>>,
    loadFinanceExchange: () => Promise<Map<TCurrency, number>>
};

type AppGetters = {
    getCoinPictures: (state: IState) => Map<string, string>,
    getSupportCoin: (state: IState) => Map<string, string>,
};

export const useApp = defineStore<"app", IState, AppGetters, IActions>({
    id: "app",
    state: () => ({
        language: localRead(Constant.Local) || getLanguage(),
        currency: null,
        collapsed: false,
        footerBgColor: "black",
        active: false,
        coin: null,
        pictures: new Map(),
        supportCoin: [],
        notices: [],
        financeExchange: new Map()
    }),
    getters: {
        getCoinPictures(state) {
            return new Map(state.pictures.get(7)?.map(({ name, path }) => [name, IMAGES_BASE + path]))
        },
        getSupportCoin(state) {
            return new Map(state.supportCoin.map((coin) => [coin, this.getCoinPictures.get(coin)]))
        }
    },
    actions: {
        async setLanguage(lang) {
            const result = await dispatchLocale(lang);
            this.$patch((state) => {
                state.language = result;
                state.currency = languages[lang].currency
            })
            localSave(Constant.Local, result);
            return true;
        },
        setCollapsed(value) {
            this.collapsed = value;
        },
        setFooterBgColor(color) {
            this.footerBgColor = color;
        },
        async loadPictures(type) {
            if (this.pictures.has(type)) return this.pictures.get(type);
            const { data } = await getPictures(type);
            this.pictures.set(type, data as Record<any, any>);
            return data
        },
        async loadSupportCoin() {
            const { data } = await supportCoin();
            this.$patch((state) => {
                state.supportCoin = data;
                state.coin = data[0]
            })
            return data
        },
        async getNotice() {
            const { data } = await getNotice(5);
            if (data && Array.isArray(data)) {
                const newNotices = data.filter(({ id }) => !this.notices.includes(id));
                if (newNotices.length) return newNotices;
            }
            return Promise.reject()
        },
        async loadFinanceExchange() {
            try {
                const { result } = await getFinanceExchange();
                const financeExchange = new Map(Object.values(result[0]).map<[TCurrency, number]>(({ name, bankConversionPri }) => [name, Number((bankConversionPri / 100).toFixed(2))]))
                this.$patch((state) => { state.financeExchange = financeExchange })
                return financeExchange
            } catch (error) {
                return new Map();
            }
        }

    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "APP_STORE",
                paths: ["notices"],
                storage: new CacheStorage(2)
            }
        ]
    },
})

export interface UseAppStore extends IState, IActions { }