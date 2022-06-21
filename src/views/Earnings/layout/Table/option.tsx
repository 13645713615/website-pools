/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-06-21 17:30:31
 */


import { formatHashrate } from "@/utils/tools";
import moment from "moment";
import { DataTableColumns, } from "naive-ui";
import { useI18n } from "vue-i18n";


export interface Columns {
    reward: string,
    date: string,
    avgHashrate: string,
    hashReward: string,
    name: string,
    coin: string
}


export function createColumns(value): DataTableColumns<Columns> {

    const { t } = useI18n()

    return [
        {
            key: "date",
            title: () => t("table.startDate"),
            width: 150,
            render(rowData) {
                return moment(rowData.date).format("YYYY-MM-DD")
            }
        },
        {
            key: "name",
            width: 150,
            align: "right",
            title: () => value.type === "1" ? t("table.coin") : t("table.account"),
            render(rowData) {
                return value.type === "1" ? rowData.coin : rowData.name
            }
        },
        {
            key: "avgHashrate",
            width: 150,
            align: "right",
            title: () => t("table.hashrate"),
            render(rowData) {
                return formatHashrate(rowData.avgHashrate)
            }
        },
        {
            key: "hashReward",
            width: 150,
            align: "right",
            title: () => t("table.hashReward")
        },
        {
            key: "reward",
            width: 150,
            title: () => t("table.reward"),
            align: "right"
        }
    ]
}

