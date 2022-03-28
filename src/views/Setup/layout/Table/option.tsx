/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-03-23 14:33:43
 */


import { DataTableColumns } from "naive-ui";
import { useI18n } from "vue-i18n";

export interface Columns {
    loginTime: string,
    loginIp: string,
    loginPlace: string,
    loginFacility: string,
}


export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n()
    return [
        {
            key: "loginTime",
            title: () => t("table.loginTime"),
            width: 150,
        },
        {
            key: "loginIp",
            width: 120,
            align: "right",
            title: () => t("table.loginIp")
        },
        {
            key: "loginPlace",
            width: 120,
            align: "right",
            title: () => t("table.loginPlace")
        },
        {
            key: "loginFacility",
            width: 180,
            align: "right",
            title: () => t("table.loginFacility"),
        }
    ]
}

