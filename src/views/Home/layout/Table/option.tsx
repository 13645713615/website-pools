/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-04-29 13:52:28
 */

import { useApp } from "@/store";
import { Calculator } from "@vicons/ionicons5";
import { DataTableColumns, NAvatar, NButton, NIcon } from "naive-ui";
import { readonly, SetupContext } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

export interface Columns {
    coinType: string,
    coinUnit: string,
    price: number,
    algo: string,
    marketValue: number
    hashrateFormat: number,
    miner: number,
    defaultMethod: string,
    avgHashrateprice: string,
    avgHashrateprice1: string,
    hashrateprice: number;
    baseRate: number;
    dayReward:string;
}
export function createColumns(context: SetupContext<{ click: (rowData: Columns) => true; }>): DataTableColumns<Columns> {
    const { t, n } = useI18n()
    const { getCoinPictures } = useApp();
    function handleCalculator(rowData: Columns) {
        context.emit("click", readonly(rowData))
    }
    return [
        {
            key: "coinType",
            title: () => t("table.coinType"),
            width: 180,
            render(rowData) {
                return (
                    <div class="flex items-center">
                        <NAvatar src={getCoinPictures.get(rowData.coinUnit)} round size={45}></NAvatar>
                        <NButton text><b class="pl-3 pr-3 text-black">{rowData.coinType}</b> <span>{rowData.coinUnit}</span> </NButton>
                    </div>
                )
            }
        },
        {
            key: "avgHashrateprice",
            width: 180,
            align: "right",
            title: () => t("table.avgHashrateprice"),
            render(rowData) {
                return rowData.dayReward
            }
        },
        {
            key: "defaultMethod",
            width: 150,
            align: "right",
            title: () => t("table.defaultMethod")
        },
        {
            key: "algo",
            width: 140,
            align: "right",
            title: () => t("table.algorithm")
        },
        {
            key: "hashrate",
            width: 160,
            align: "right",
            title: () => t("table.hashrateFormat")
        },
        {
            key: "price",
            width: 180,
            align: "right",
            title: () => t("table.price"),
            render(rowData) {
                return (
                    <>{n(rowData.price, "currency")} </>
                )
            }
        },
        {
            key: 'actions',
            render(row) {
                return (
                    <div class="flex items-center justify-end min-w-9">
                        <NButton onClick={handleCalculator.bind(null, row)} class="mr-5" text ><NIcon size={34} color="#005adb" component={Calculator}></NIcon></NButton>
                        <RouterLink to={{ name: "GPU", params: { coin: row.coinType } }}><NButton type="primary">{t("operation.excavation")}</NButton></RouterLink>
                    </div>
                )
            }
        }
    ]
}

