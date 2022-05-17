/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-05-17 15:51:32
 */


import { useApp } from "@/store";
import { ShareSocial } from "@vicons/ionicons5";
import { DataTableColumns, NAvatar, NButton, NIcon } from "naive-ui";
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter } from "vue-router";

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
    const { push } = useRouter()
    const { getCoinPictures } = useApp();
    function handleShare({ currency, accountName }: Columns, e: Event) {
        e.stopPropagation()
        push({ name: "acountShare", query: { accountName, coin: currency } })

    }

    return [
        {
            key: "currency",
            title: () => t("table.coin"),
            width: 140,
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
            width: 140,
            align: "right",
            title: () => t("table.m5"),
            colSpan: (rowData) => {
                return (rowData.offline + rowData.online) ? 1 : 5
            },
            render(rowData) {
                return (rowData.offline + rowData.online) ? rowData.m5 : <div class="text-left pl-24">{t("tip.empty", { coin: rowData.currency })}，<RouterLink class="text-primary" to={{ name: "GPU", params: { coin: rowData.currency } }}>{t("button.started")}</RouterLink></div>
            }
        },
        {
            key: "yesterdayM5",
            width: 140,
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
            width: 140,
            align: "right",
            title: () => t("table.blanace"),
        },
        {
            key: "etime",
            width: 180,
            align: "right",
            title: () => t("table.etime"),
        },
        {
            key: 'actions',
            align: "right",
            fixed: 'right',
            width: 100,
            render(row) {
                return (
                    <div>
                        <NButton  tertiary onClick={handleShare.bind(null, row)} circle type="info" v-slots={{ icon: () => <NIcon component={ShareSocial} /> }}></NButton>
                    </div>
                )
            }
        }
    ]
}

