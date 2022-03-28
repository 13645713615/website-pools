/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-03-27 12:58:58
 */


import { formatHashrate } from "@/utils/tools";
import { DataTableColumns } from "naive-ui";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

export interface Columns {
    address: string
    agentHost: string
    chazhi24Scale: number
    chazhi30mScale: number
    chazhiScale: number
    invalid24hscale: number
    invalid30mscale: number
    invalidscale: number
    lastbeat: string
    localspeed: number
    localspeed24h: number
    localspeed30m: number
    offline: number
    speed: number
    speed24h: number
    speed24hcount: number
    speed24hinvalid: number
    speed24hinvalidcount: number
    speed24hstale: number
    speed24hstalecount: number
    speed30m: number
    speed30mcount: number
    speed30minvalid: number
    speed30minvalidcount: number
    speed30mstale: number
    speed30mstalecount: number
    speedcount: number
    speedinvalid: number
    speedinvalidcount: number
    speedstale: number
    speedstalecount: number
    stale24hscale: number
    stale30mscale: number
    stalescale: number
    valid24hscale: number
    valid30mscale: number
    validscale: number
    worker: string
}
export function createColumns({ handleClickWorker }: { handleClickWorker: (rowData: Columns) => void }): DataTableColumns<Columns> {
    const { t } = useI18n()
    return [
        {
            key: "worker",
            width: 150,
            ellipsis: true,
            sorter: true,
            title: () => t("table.worker"),
            render(rowData) {
                return <RouterLink to={{ query: { worker: rowData.worker } }}><span onClick={handleClickWorker.bind(null,rowData)} class="text-black font-semibold">{rowData.worker}</span></RouterLink>
            }
        },
        {
            key: "suanliFlag",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.nowM5"),
            render: (rowData) => formatHashrate(rowData.speed)
        },
        {
            key: "localSuanLiFlag",
            width: 160,
            align: "right",
            sorter: true,
            title: () => t("table.nowHashm5"),
            render: (rowData) => formatHashrate(rowData.localspeed)
        },

        {
            key: "vcountFlag",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.validscale"),
            render: (rowData) => `${rowData.validscale} %`
        },
        {
            key: "uncountFlag",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.invalidscale"),
            render: (rowData) => `${rowData.invalidscale} %`
        },
        {
            key: "stale24hscale",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.stalescale"),
            render: (rowData) => `${rowData.stalescale} %`
        },
        {
            key: "suanlicha",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.chazhiScale"),
            render: (rowData) => rowData.chazhiScale
        },
        {
            key: "timeFlag",
            width: 200,
            sorter: true,
            align: "right",
            title: () => t("table.nowTime"),
            render: (rowData) => rowData.lastbeat
        }
    ]
}

