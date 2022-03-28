/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-03-16 17:22:38
 */


import { useApp } from "@/store";
import { DataTableColumns } from "naive-ui";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

export interface Columns {
    blockHeight: number,
    blockType: string,
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
            title: () => t("table.type")
        },
        {
            key: "time",
            width: 180,
            align: "right",
            title: () => t("table.date")
        },
        {
            key: "workerPlace",
            width: 140,
            align: "right",
            title: () => t("table.region")
        },
        {
            key: "workers",
            width: 200,
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
            title: () => t("table.luck"),
        },
    ]
}

