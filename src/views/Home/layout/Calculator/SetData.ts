/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-15 22:28:56
 * @LastEditTime: 2022-05-20 13:44:31
 */

import { SelectBaseOption } from "naive-ui/lib/select/src/interface";
import { ComputedRef, unref } from "vue";

export type Dates = "day" | "month" | "year"
export type Units = "M" | "G" | "T"
export const dateOptions: SelectBaseOption<Dates, string>[] = [{ value: "day", label: "每天" }, { value: "month", label: "每月" }, { value: "year", label: "每年" }];
export const unitOptions: SelectBaseOption<Units, string>[] = [{ value: "M", label: "MH/s" }, { value: "G", label: "GH/s" }, { value: "T", label: "TH/s" }];
export const dates = new Map<Dates, number>([["day", 1], ["month", 30], ["year", 365]]);
export const units = new Map<Units, number>([["M", 0.001], ["G", 1], ["T", 1000]]);


// dayReward（GH/s日收益）* price(块价) = GH/s 每日收益人民币
// dayReward（GH/s日收益）* price(块价) * 0.001 = MH/s 每日收益人民币
// dayReward（GH/s日收益）* price(块价) * 0.001 * 30 = MH/s 每月收益人民币

export class SetData {
    public scope: string;

    public unit: Units;

    public date: Dates;

    public get unitValue(): number {
        return units.get(this.unit)
    }

    public get dateValue(): number {
        return dates.get(this.date)
    }

    public dateLable: string;

    public getConinInfo: ComputedRef<{ dayReward: string, price: number }>

    public get dayReward(): number {
        return parseFloat(unref(this.getConinInfo)?.dayReward) || 0
    }

    public get price(): number {
        return unref(this.getConinInfo)?.price || 0
    }

    constructor(data: ComputedRef<{ dayReward: string, price: number }>, scope: number | string) {
        this.unit = unitOptions[0].value;
        this.date = dateOptions[0].value;
        this.onUpdateScope(scope);
        this.getConinInfo = data;
    }

    public get amountScope(): number {
        return Number(this.scope) * this.unitValue * this.dateValue
    }

    public get coinEarnings(): number {
        return Number((this.dayReward * this.amountScope).toFixed(6))
    }

    public get moneyEarnings(): number {
        return Number((this.dayReward * this.price * this.amountScope).toFixed(2))
    }

    public onUpdateDate(value: Dates, option: SelectBaseOption<Dates, string>) {
        this.date = value;
        this.dateLable = option.label;
    }

    public onUpdateScope(value: string | number) {
        let scope = Number(value);
        if (isNaN(Number(value))) return;
        if (scope < 0) scope = 1;
        this.scope = scope.toString();
    }
}