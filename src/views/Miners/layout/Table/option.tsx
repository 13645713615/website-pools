/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-09-01 10:03:57
 */


import { useApp } from "@/store";
import { ellipsis } from "@/utils/tools";
import { DataTableColumns } from "naive-ui";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

export interface Columns {
    minerName: string
    hash: string
    balance: string
    miners: string
    time: string
}


export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n()
    const appStore = useApp()
    return [
        {
            key: "minerName",
            title: () => t("table.wallet"),
            width: 240,
            render: (rowData) => <RouterLink to={`/miner/${appStore.coin.toLowerCase()}/${rowData.minerName}`} class="block text-primary truncate max-w-20 hover:underline">{rowData.minerName}</RouterLink>

        },
        {
            key: "hash",
            width: 140,
            align: "right",
            title: () => t("table.hashrate")
        },
        {
            key: "balance",
            width: 150,
            align: "right",
            title: () => t("table.balance")
        },
        {
            key: "miners",
            width: 140,
            align: "right",
            title: () => t("table.workers")
        },
        {
            key: "time",
            width: 200,
            align: "right",
            title: () => t("table.joined")
        }
    ]
}

