/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-03-12 09:26:56
 */


import { DataTableColumns} from "naive-ui";
import { useI18n } from "vue-i18n";

export interface Columns {
    paymentsHash: string,
    datastr: string,
    payMoney: number,
    userPoundage: string,
    payStatus: string
}
export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n()
    return [
        {
            key: "paymentsHash",
            width: 200,
            ellipsis: true,
            title: () => t("table.paymentsHash")
        },
        {
            key: "datastr",
            width: 150,
            align: "right",
            title: () => t("table.datastr")
        },
        {
            key: "payMoney",
            width: 150,
            align: "right",
            title: () => t("table.payMoney")
        },

        {
            key: "userPoundage",
            width: 150,
            align: "right",
            title: () => t("table.userPoundage")
        },
        {
            key: "payStatus",
            width: 150,
            align: "right",
            title: () => t("table.payStatus")
        }
    ]
}

