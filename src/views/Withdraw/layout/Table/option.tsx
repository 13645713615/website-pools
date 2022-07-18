/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-07-18 18:09:34
 */


import { useApp } from "@/store";
import { Ban, TrashOutline } from "@vicons/ionicons5";
import moment from "moment";
import { DataTableColumns, NAvatar, NBadge, NButton, NIcon, NSpace, NTooltip } from "naive-ui";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
// import { EditFormButton } from "../Create";

export interface Columns {
    username: number;
    coin: string;
    status: string;
    creTime: number;
}


export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n()

    return [
        {
            key: "creTime",
            width: 200,
            title: () => t("table.dateStr"),
            render(rowData) {
                return moment(rowData.creTime).format("YYYY-MM-DD HH:mm")
            }
        },
        {
            key: "status",
            width: 120,
            title: () => t("table.state"),
        }
    ]
}

