/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-16 21:03:54
 * @LastEditTime: 2022-04-28 15:39:02
 */


import type { Module as MinerStatsModule } from "@/views/MinerStats";
import type { Module as TransferRecordsModule } from "@/views/TransferRecord";
import { SelectBaseOption, SelectGroupOptionBase } from "naive-ui/lib/select/src/interface";

export type MinerModule = MinerStatsModule | TransferRecordsModule | "Profit" | "TransferRecord" | "MinerStats";

interface ModuleBaseOptions extends SelectBaseOption {
    label: string;
    key: MinerModule;
    value: MinerModule;
}

interface ModuleGroupOptions extends SelectGroupOptionBase {
    label: string;
    key: MinerModule;
    type: "group",
    children: ModuleBaseOptions[]
}

export type ModuleOptions = ModuleBaseOptions | ModuleGroupOptions

const module: ModuleOptions[] = [
    {
        label: "矿机状态",
        key: "MinerStats",
        type: "group",
        children: [
            {
                label: "矿机算力",
                key: "HashCharts",
                value: "HashCharts",
            },
            {
                label: "份额总数",
                key: "SharesCharts",
                value: "SharesCharts",
            },
            {
                label: "矿机列表",
                key: "MinerTable",
                value: "MinerTable",
            },

        ]
    },
    {
        label: "交易记录",
        key: "Profit",
        value: "Profit",
    },
    {
        label: "收益",
        key: "TransferRecord",
        type: "group",
        children: [
            {
                label: "实时收益",
                key: "EarningCharts",
                value: "EarningCharts",
            },
            {
                label: "结算波动图",
                key: "SettlementChart",
                value: "SettlementChart",
            },
            {
                label: "结算列表",
                key: "SettlementTable",
                value: "SettlementTable",
            },
            
        ]
    },
]


export const allModule: MinerModule[] = ["MinerStats", "HashCharts", "SharesCharts", "MinerTable", "Profit", "TransferRecord", "EarningCharts", "SettlementChart","SettlementTable"]

export const allModuleValue: MinerModule[] = ["HashCharts", "SharesCharts", "MinerTable", "Profit", "EarningCharts", "SettlementChart","SettlementTable"]


export function* moduleValue(list: ModuleOptions[], include: string[]): Generator<string[]> {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const children = item.children as ModuleBaseOptions[] | undefined
        let value: string[] | null = null;
        if (include.includes(item.key)) {
            value = [item.key];
        }
        if (children && children.length) {
            const childrenValue = [...moduleValue(children, include)].flat();
            if (value) {
                Array.prototype.push.apply(value, childrenValue)
            } else if (childrenValue.length) {
                value = [item.key, ...childrenValue]
            }
        }
        if (value) yield value
    }
}

export default module