/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 18:36:25
 * @LastEditTime: 2022-03-27 13:01:33
 */

import { WorkerSearch } from "@/service/api.types";
import { objNoNempty } from "@/utils/tools";
import { ProvideWalletInfo } from "@/views/Miner/provide";
import { ComputedRef, inject, unref, watch } from "vue";

export default class SetData implements WorkerSearch {

    public pageSize = 20;

    public pageNo = 1;

    public minType = 0;

    public type = 2;

    public millName: string;

    public flag: string;

    public upOrDown = 0;

    private walletInfo: ComputedRef<{ coin: string; wallet: string; token: string; }>;

    public get token(): string {
        return unref(this.walletInfo).token
    }
    public get coin(): string {
        return unref(this.walletInfo).coin
    }
    public get user(): string {
        return unref(this.walletInfo).wallet
    }

    public pageSizes: number[] = [20, 50, 100, 200, 500];

    public showSizePicker: boolean = true;

    public itemCount: number = 1;

    public pageSlot: number = 5;

    public get page(): number {
        return this.pageNo
    }

    private trigger: (this: SetData) => void;

    constructor() {
        this.walletInfo = inject(ProvideWalletInfo)
    }

    public onUpdatePage(page) {
        if (this.pageNo == page) return;
        this.pageNo = page;
        this.trigger?.apply(this);
    }

    public onUpdatePageSize(pageSize) {
        if (this.pageSize == pageSize) return;
        this.pageSize = pageSize;
        this.pageNo = 1;
        this.trigger?.apply(this);
    }

    public onUpdateType(type: number) {
        this.type = type;
        this.pageNo = 1;
        this.trigger?.apply(this);
    }

    public onSorter({ columnKey, order }) {
        this.flag = columnKey
        switch (order) {
            case "ascend":
                this.upOrDown = 0
                break;
            case "descend":
                this.upOrDown = 1
                break;
            default:
                this.upOrDown = 0
                this.flag = ""
                break;
        }
        this.pageNo = 1
        this.trigger?.apply(this);
    }

    public getData(): WorkerSearch {
        const { pageNo, minType, token, coin, user, millName, flag, upOrDown, pageSize, type } = this;
        return objNoNempty<WorkerSearch>({ pageNo, minType, token, coin, user, millName, flag, upOrDown, pageSize, type })
    }

    public on(fn: (this: SetData) => void) {
        this.trigger = fn
    }
}