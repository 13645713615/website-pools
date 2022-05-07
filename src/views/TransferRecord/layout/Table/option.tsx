/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-05-06 16:14:02
 */


import { DataTableColumns, NIcon, NSpace, NTooltip } from "naive-ui";
import { useI18n } from "vue-i18n";
import moment from "moment"
import { AlertCircleOutline } from "@vicons/ionicons5";
import { formatHashrate, formatHashrateUnit, toFixed } from "@/utils/tools";
export interface Columns {
    dateStr: string,
    reward: number,
    totalReward: number,
    mev: number,
    blockReward: number,
    txFree: number,
    avgHashrate: string,
    status: number;
}
const status = ["未结算", "结算成功", "结算不通过"];
export function createColumns(): DataTableColumns<Columns> {
    const { t } = useI18n();

    return [
        {
            key: "dateStr",
            width: 150,
            title: () => t("table.dateStr"),
            render(rowData) {
                return moment(rowData.dateStr).format("YYYY-MM-DD")

            }
        },
        {
            key: "avgHashrate",
            width: 150,
            title: () => t("table.avgHashrate"),
            align: "right",
            render(rowData) {
                return formatHashrateUnit(rowData.avgHashrate,"M")
            }
        },
        {
            key: "totalReward",
            width: 180,
            align: "right",
            title: () => t("table.reward"),
            render(rowData) {
                return <Reward data={rowData}></Reward>
            }
        },
        {
            key: "status",
            width: 180,
            align: "right",
            title: () => t("table.state"),
            render(rowData) {
                return status[rowData.status]
            }
        },
    ]
}


function Reward(props: { data: Columns }) {
    const { t } = useI18n();
    return (
        <NSpace justify="end" align="center">
            <span>{toFixed(props.data.totalReward)}</span>
            <NTooltip v-slots={{ trigger: () => <NIcon size={16} component={AlertCircleOutline} /> }}>
                <div class="flex gap-1 flex-col w-52">
                    <span>{t("table.totalReward")}: {toFixed(props.data.totalReward)}</span>
                    <span>{t("table.mev")}: {toFixed(props.data.mev)}</span>
                    <span>{t("table.txFree")}: {toFixed(props.data.txFree)}</span>
                    <span>{t("table.blockReward")}: {toFixed(props.data.blockReward)}</span>
                </div>
            </NTooltip>
        </NSpace>
    )
}
