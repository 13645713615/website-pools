/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 23:18:13
 * @LastEditTime: 2022-03-27 16:15:33
 */

import { getAccountCoin, login } from "@/service/api";
import { defineStore } from "pinia";
import { CacheStorage } from "@/utils/cache"
import { useApp } from "./app";

export interface UserInfo {
    email: string,
    phone: string,
    token: string,
    userId: number,
    username: string
}
export interface UsersAccount {
    coin: string[],
    name: string,
    remarkName?: string,
}

export interface UserState {
    userInfo: UserInfo | null,
    usersAccount: Record<string, UsersAccount> | null,
    currentAccountCoin: [string, string | null],
    userAccountCoinData: Record<string, Record<string, any>>,
    active: boolean
}
export interface UseraActions {
    login(data: { username: string, password: string, place?: string }): Promise<UserInfo>;
    loadUsersCoins(): Promise<Record<string, UsersAccount> | null>;
    setAccount(account: string, coin?: string): void;
    setCoin(coin: string): void;
    getUserAccountCoin: (v: { account: string, coin: string } | string) => Record<string, any>[] | Record<string, any> | false
    setUsersAccount: (key: string, data: UsersAccount) => void;
}
export type UserGetters = {
    getToken: (state: UserState) => string | undefined,
    getUserCoins: (state: UserState) => string[] | undefined,
    getAccount: (state: UserState) => string | null,
    getCoin: (state: UserState) => string | null,
    getUserAccounts: (state: UserState) => string[],
}

export const useUser = defineStore<"user", UserState, UserGetters, UseraActions>({
    id: "user",
    state: () => {
        return {
            userInfo: null,
            coin: null,
            currentAccountCoin: [null, null],
            usersAccount: {},
            userAccountCoinData: {},
            active: false,
        }
    },
    getters: {
        getToken(state) {
            return state.userInfo?.token
        },
        getUserAccounts(state) {
            return Object.keys(state.usersAccount)
        },
        getUserCoins(state) {
            return state.usersAccount[this.getAccount]?.coin || []
        },
        getAccount(state) {
            return state.currentAccountCoin[0]
        },
        getCoin(state) {
            return state.currentAccountCoin[1]
        }
    },
    actions: {
        async login(data) {
            const result = await login(data);
            this.userInfo = result.data;
            return result.data
        },
        setAccount(account) {
            if (this.usersAccount.hasOwnProperty(account)) {
                const { name, coin } = this.usersAccount[account]
                this.currentAccountCoin = [name, coin[0]]
            }
        },
        setCoin(coin) {
            this.currentAccountCoin[1] = coin
        },
        setUsersAccount(key, data) {
            const { supportCoin } = useApp()
            const size = Object.keys(this.usersAccount).length;
            const usersAccount = { ...data, coin: [] };
            const userAccountCoinData: Record<string, Record<string, any>> = {};
            const { coin: coins, name } = usersAccount;
            supportCoin.forEach(coin => {
                coin = coin.toLowerCase()
                coins.push(coin);
                userAccountCoinData[`${name}:${coin}`] = { accountName: name, currency: coin }
            })
            this.$patch((state => {
                state.usersAccount[key] = usersAccount;
                Object.assign(state.userAccountCoinData, userAccountCoinData)
            }))
            if (!size) {
                this.setAccount(key);
            }
        },
        async loadUsersCoins() {
            const usersAccount: Record<string, UsersAccount> = {};
            const userAccountCoinData: Record<string, Record<string, any>> = {};
            try {
                const { supportCoin } = useApp()
                const { data } = await getAccountCoin(supportCoin);
                data.forEach((item) => {
                    const { accountName: name, remark: remarkName, currency } = item;
                    if (usersAccount.hasOwnProperty(name)) {
                        usersAccount[name].coin.push(currency)
                    } else {
                        usersAccount[name] = { coin: [currency], name, remarkName }
                    }
                    userAccountCoinData[`${name}:${currency}`] = item
                })
                this.$patch((state) => {
                    state.usersAccount = usersAccount;
                    state.userAccountCoinData = userAccountCoinData;
                })
                this.setAccount(data[0]?.accountName);
            } catch (error: any) {
                console.log(error)
                throw new Error(error.message)
            }
            return usersAccount
        },
        getUserAccountCoin(value) {
            if (typeof value === "string") {

            } else {
                const { account, coin } = value;
                const key = `${account}:${coin.toLowerCase()}`;
                if (Object.prototype.hasOwnProperty.call(this.userAccountCoinData, key)) {
                    return this.userAccountCoinData[key]
                }
            }
            return false
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "APP_USER_STORE",
                storage: new CacheStorage(2),
                paths: ["userInfo", "coin"]
            }
        ]
    },
})


