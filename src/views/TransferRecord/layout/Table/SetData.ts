/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-07-08 16:11:06
 * @LastEditTime: 2022-07-08 18:44:56
 */


import { getSettlementList } from "@/service/api";
import { objNoNempty } from "@/utils/tools";
import { ProvideWalletInfo } from "@/views/Miner/provide";
import { ComputedRef, inject, unref } from "vue";

type SearchData = Parameters<typeof getSettlementList>[0]

export default class SetData {

    private pageSize = 30;

    public current = 1;

    public month = "";

    private walletInfo: ComputedRef<{ coin: string; wallet: string; token: string; }>;

    public get token(): string {
        return unref(this.walletInfo).token
    }
    public get coin(): string {
        return unref(this.walletInfo).coin
    }
    public get accountName(): string {
        return unref(this.walletInfo).wallet
    }

    public pageSizes: number[] = [10, 30, 40, 50, 60];

    public showSizePicker: boolean = true;

    public itemCount: number = 1;

    public pageSlot: number = 5;

    public get page(): number {
        return this.current
    }

    private trigger: (this: SetData) => void;

    constructor() {
        this.walletInfo = inject(ProvideWalletInfo)
    }

    public onUpdatePage(page) {
        if (this.current == page) return;
        this.current = page;
        this.trigger?.apply(this);
    }

    public onUpdatePageSize(pageSize) {
        if (this.pageSize == pageSize) return;
        this.pageSize = pageSize;
        this.current = 1;
        this.trigger?.apply(this);
    }

    public onUpdateMonth(formattedValue: string) {
        console.log(formattedValue)
        this.month = formattedValue;
        this.current = 1;
        this.trigger?.apply(this);
    }


    public getData(): SearchData {
        const { token, coin, accountName, pageSize: size, current, month } = this;
        return objNoNempty<SearchData>({ token, coin, accountName, size, current, month })
    }

    public on(fn: (this: SetData) => void) {
        this.trigger = fn
    }
}