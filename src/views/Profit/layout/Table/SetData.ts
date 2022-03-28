/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-12 09:13:44
 * @LastEditTime: 2022-03-12 09:53:10
 */

import { PaymentSearch } from "@/service/api.types";
import { objNoNempty } from "@/utils/tools";
import { ProvideWalletInfo } from "@/views/Miner/provide";
import { inject, unref } from "vue";

export default class SetData implements PaymentSearch {

    public pageSize = 20;

    public pageNo = 1;

    public type = -1;


    private walletInfo: { coin: string; wallet: string; token: string; };

    public get token(): string {
        return this.walletInfo.token
    }
    public get coin(): string {
        return this.walletInfo.coin
    }
    public get accountName(): string {
        return this.walletInfo.wallet
    }

    public pageSizes: number[] = [20, 50, 100, 200];

    public showSizePicker: boolean = true;

    public itemCount: number;

    public get page(): number {
        return this.pageNo
    }

    private trigger: (this: SetData) => void;

    constructor() {
        this.walletInfo = unref(inject(ProvideWalletInfo));
    }

    public onChange = (page) => {
        this.pageNo = page;
        this.trigger?.apply(this);
    }

    public onUpdatePageSize = (pageSize) => {
        this.pageSize = pageSize;
        this.pageNo = 1;
        this.trigger?.apply(this);
    }

    public getData = (): PaymentSearch => {
        const { pageNo, token, coin, accountName, pageSize, type } = this;
        return objNoNempty<PaymentSearch>({ pageNo, token, coin, accountName, pageSize, type })
    }

    public on = (fn: (this: SetData) => void) => {
        this.trigger = fn
    }
}