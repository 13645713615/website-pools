/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-03-26 20:37:33
 */


import { useApp } from "@/store";
import { DataTableColumns, NAvatar, NButton, NSpace } from "naive-ui";
import { useI18n } from "vue-i18n";
import PayStatus from "../PayStatus";
import { EditButton } from "../SetAutomaticPay";

export enum ColumnsType {
    PayStatus,
    Son,
    Father,
}

export interface Columns {
    address?: string,
    coin?: string,
    id?: number,
    cratedts?: string,
    remark?: string,
    scale?: number,
    children?: Columns[],
    type?: ColumnsType,
    parentIndex?:number
}

function RenderCoin(rowData: Columns, getCoinPictures: Map<string, string>) {
    const coin = rowData.coin?.toUpperCase();
    return (
        <div class="inline-flex items-center">
            <NAvatar src={getCoinPictures.get(coin)} round size={40}></NAvatar>
            <span class="ml-3">{coin}</span>
        </div>
    )
}


function RenderPayStatus(rowData: Columns) {
    return <PayStatus coin={rowData.coin} />
}

export function createColumns({ handleDelete }: { handleDelete: (row: Columns) => void }): DataTableColumns<Columns> {
    const { t } = useI18n()
    const { getCoinPictures } = useApp();

    return [
        {
            key: "coin",
            title: () => t("table.coin"),
            width: 150,
            colSpan: (rowData) => {
                return rowData.type === ColumnsType.PayStatus ? 6 : 1
            },
            render(rowData) {
                switch (rowData.type) {
                    case ColumnsType.Father:
                        return RenderCoin(rowData, getCoinPictures)
                    case ColumnsType.PayStatus:
                        return RenderPayStatus(rowData)
                    default:
                        return rowData.coin?.toUpperCase()
                }
            }
        },
        {
            key: "address",
            width: 180,
            ellipsis: {
                tooltip: true
            },
            align: "right",
            title: () => t("table.coinAddress")
        },
        {
            key: "scale",
            width: 120,
            align: "right",
            title: () => t("table.scale"),
            render(row) {
                return `${row.scale} %`
            }
        },
        {
            key: "remark",
            width: 180,
            ellipsis: {
                tooltip: true
            },
            align: "right",
            title: () => t("table.remark")
        },
        {
            key: "updateTime",
            width: 180,
            align: "right",
            title: () => t("table.cratedts")
        },
        {
            key: 'actions',
            render(row) {
                return row.id ?
                    (
                        <NSpace class="min-w-9 mx-2">
                            <EditButton data={row} />
                            <NButton type="warning" text onClick={handleDelete.bind(null, row)}>{t("button.delete")}</NButton>
                        </NSpace>
                    ) : null
            }
        }
    ]
}

