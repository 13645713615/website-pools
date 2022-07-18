/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-07-18 14:18:10
 */


import { formatHashrate } from "@/utils/tools";
import moment from "moment";
import { DataTableColumns, } from "naive-ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";


export interface Columns {
    reward: string,
    date: string,
    avgHashrate: string,
    hashReward: string,
    name: string,
    coin: string
}


export function createColumns(value) {

    const { t } = useI18n()

    return computed<DataTableColumns<Columns>>(() => {
        const columns = [
            {
                key: "date",
                title: () => t("table.startDate"),
                width: 150,
                render(rowData) {
                    return moment(rowData.date).format("YYYY-MM-DD")
                }
            },
            {
                key: "coin",
                width: 150,
                align: "right",
                title: () => t("table.coin"),
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
        ] as DataTableColumns<Columns>;
        if (value.type == 2) {
            columns.splice(2, 0, {
                key: "name",
                width: 150,
                align: "right",
                title: () => t("table.account")
            })
        }
        return columns
    })


}

