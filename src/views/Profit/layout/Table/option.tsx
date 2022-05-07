/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-04-30 16:10:32
 */


import { DataTableColumns } from "naive-ui";
import { Ref } from "vue";
import { useI18n } from "vue-i18n";

export interface Columns {
    paymentsHash: string,
    datastr: string,
    payMoney: number,
    userPoundage: string,
    payStatus: string
}
export function createColumns({ links }: { links: Ref<{ tx?: string }> }): DataTableColumns<Columns> {
    const { t } = useI18n()
    return [
        {
            key: "paymentsHash",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
            title: () => t("table.paymentsHash"),
            className: "!text-black",
            render(rowData) {
                const props = {
                    href: links.value?.tx.replace("{TxId}", rowData.paymentsHash),
                    class: "text-current",
                    target: "_blank"
                }
                return <a  {...props}>{rowData.paymentsHash}</a>
            }
        },
        {
            key: "datastr",
            width: 140,
            align: "right",
            title: () => t("table.datastr")
        },
        {
            key: "payMoney",
            width: 140,
            align: "right",
            title: () => t("table.payMoney")
        },

        {
            key: "userPoundage",
            width: 140,
            align: "right",
            title: () => t("table.userPoundage")
        },
        {
            key: "payStatus",
            width: 140,
            align: "right",
            title: () => t("table.payStatus")
        },
        {
            key: "remark",
            width: 150,
            ellipsis: {
                tooltip: true,
            },
            align: "right",
            title: () => t("table.remark")
        }
    ]
}

