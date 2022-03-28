/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-03-25 21:02:09
 */


import { useApp } from "@/store";
import { DataTableColumns, NAvatar, NButton } from "naive-ui";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { ChangeAddressFormButton } from "../AddressChange";

export interface Columns {
    currency: string,
    m5: string,
    yesterdayM5: string,
    offline: string,
    online: string,
    blanace: string,
    etime: string,
    adress: string,
    accountId: number,
    accountName: string,
    id: number,
    isMyTrue: boolean
}


export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n()
    const { getCoinPictures } = useApp();
    return [
        {
            key: "currency",
            title: () => t("table.coin"),
            width: 120,
            render(rowData) {
                return (
                    <div class="flex items-center">
                        <NAvatar src={getCoinPictures.get(rowData.currency.toUpperCase())} round size={45}></NAvatar>
                        <span class="ml-3">{rowData.currency}</span>
                    </div>
                )
            }
        },
        {
            key: "m5",
            width: 100,
            align: "right",
            title: () => t("table.m5"),
            colSpan: (rowData) => {
                return (rowData.offline + rowData.online) ? 1 : 6
            },
            render(rowData) {
                return (rowData.offline + rowData.online) ? rowData.m5 : <div class="text-left pl-24">{t("tip.empty",{coin:rowData.currency})}，<RouterLink class="text-primary" to={{ name: "GPU", params: { coin: rowData.currency } }}>{t("button.started")}</RouterLink></div>
            }
        },
        {
            key: "yesterdayM5",
            width: 120,
            align: "right",
            title: () => t("table.yesterdayM5")
        },
        {
            key: "minerStatus",
            width: 140,
            align: "right",
            title: () => t("table.minerStatus"),
            render(rowData) {
                return (<>{rowData.online} <span class="text-gray-500">/ {rowData.offline}</span></>)
            }
        },
        {
            key: "blanace",
            width: 130,
            align: "right",
            title: () => t("table.blanace"),
        },
        {
            key: "etime",
            width: 180,
            align: "right",
            title: () => t("table.etime"),
        },
        // {
        //     key: 'actions',
        //     align: "right",
        //     render(row) {
        //         return (
        //             <div class="min-w-8">
        //                 <ChangeAddressFormButton data={row} />
        //             </div>
        //         )
        //     }
        // }
    ]
}

