/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-06-02 09:57:10
 */


import { useApp } from "@/store";
import { DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

export interface Columns {
    blockHeight: number,
    blockType: number,
    date: string,
    workerPlace: string,
    workers: string,
    reward: string,
    luck: string,
}



export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n()
    const { coin } = storeToRefs(useApp())

    return [
        {
            key: "blockHeight",
            title: () => t("table.number"),
            width: 180
        },
        {
            key: "blockType",
            width: 100,
            align: "right",
            title: () => t("table.type"),
            render: (rowData) => {
                switch (rowData.blockType) {
                    case 1:
                        return "正常块"
                    case 2:
                        return "叔块"
                    case 0:
                        return "孤块"
                    default:
                        return rowData.blockType
                }
            }
        },
        {
            key: "time",
            width: 200,
            align: "right",
            title: () => t("table.date")
        },
        // {
        //     key: "workerPlace",
        //     width: 140,
        //     align: "right",
        //     title: () => t("table.region")
        // },
        {
            key: "workers",
            width: 260,
            align: "right",
            ellipsis: {
                tooltip: true
            },
            title: () => t("table.miner"),
            render: (rowData) => <RouterLink to={`/miner/${coin.value.toLowerCase()}/${rowData.workers}`} class="block text-primary truncate max-w-20 hover:underline">{rowData.workers}</RouterLink>
        },
        {
            key: "reward",
            width: 180,
            align: "right",
            title: () => t("table.reward"),
        },
        {
            key: "lucky",
            width: 180,
            align: "right",
            title: () => t("table.luck"),
        },
    ]
}

