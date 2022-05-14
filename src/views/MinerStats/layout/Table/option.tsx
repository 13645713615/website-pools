/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-05-14 17:46:07
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
export function createColumns({ handleClickWorker, ds }: { handleClickWorker: (rowData: Columns) => void, ds: Record<string, any> }): DataTableColumns<Columns> {
    const { t } = useI18n()

    function useToggle(value: Array<string | number>) {
        switch (ds.minType) {
            case 0:
                return value[0]
            case 1:
                return value[1]
            case 2:
                return value[2]
            default:
                return ""
        }
    }
    return [
        {
            key: "worker",
            width: 150,
            ellipsis: {
                tooltip: true,
            },
            className: "!text-black",
            sorter: true,
            title: () => t("table.worker"),
            render(rowData) {
                return <RouterLink class="text-current" to={{ query: { worker: rowData.worker } }}><span onClick={handleClickWorker.bind(null, rowData)} class="font-semibold">{rowData.worker}</span></RouterLink>
            }
        },
        {
            key: "suanliFlag",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.nowM5"),
            render: (rowData) => formatHashrate(useToggle([rowData.speed, rowData.speed30m, rowData.speed24h]))
        },
        {
            key: "localSuanLiFlag",
            width: 160,
            align: "right",
            sorter: true,
            title: () => t("table.nowHashm5"),
            render: (rowData) => formatHashrate(useToggle([rowData.localspeed, rowData.localspeed30m, rowData.localspeed24h]))
        },

        {
            key: "vcountFlag",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.validscale"),
            render: (rowData) => `${useToggle([rowData.valid30mscale, rowData.valid30mscale, rowData.valid24hscale])} %`
        },
        {
            key: "uncountFlag",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.invalidscale"),
            render: (rowData) => `${useToggle([rowData.invalid30mscale, rowData.invalid30mscale, rowData.invalid24hscale])} %`
        },
        {
            key: "stale24hscale",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.stalescale"),
            render: (rowData) => `${useToggle([rowData.stale30mscale, rowData.stale30mscale, rowData.stale24hscale])} %`
        },
        {
            key: "suanlicha",
            width: 150,
            align: "right",
            sorter: true,
            title: () => t("table.chazhiScale"),
            render: (rowData) => useToggle([rowData.chazhiScale, rowData.chazhi30mScale, rowData.chazhi24Scale])
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

