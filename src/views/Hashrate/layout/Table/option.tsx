/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-06-21 15:20:37
 */


import { formatHashrate } from "@/utils/tools";
import { DataTableColumns, } from "naive-ui";
import { useI18n } from "vue-i18n";


export interface Columns {
    hash: string,
    minerName: string,
    offline: string,
    online: string,
    hash24h: string
}


export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n()

    return [
        {
            key: "minerName",
            title: () => t("table.account"),
            width: 150,
        },
        {
            key: "hash",
            width: 150,
            align: "right",
            title: () => t("table.m5"),
            render(rowData) {
                return formatHashrate(rowData.hash)
            }
        },
        {
            key: "hash24h",
            width: 150,
            align: "right",
            title: () => t("table.hashrate"),
            render(rowData) {
                return formatHashrate(rowData.hash24h)
            }
        },
        {
            key: "minerStatus",
            width: 150,
            align: "right",
            title: () => t("table.minerStatus"),
            render(rowData) {
                return (<>{rowData.online} <span class="text-gray-500">/ {rowData.offline}</span></>)
            }
        }
    ]
}

