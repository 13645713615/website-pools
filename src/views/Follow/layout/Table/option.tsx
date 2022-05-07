/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-05-03 12:22:33
 */


import { useApp } from "@/store";
import { TrashOutline } from "@vicons/ionicons5";
import { DataTableColumns, NAvatar, NBadge, NButton, NIcon, NSpace } from "naive-ui";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { EditFormButton } from "../Create";

export interface Columns {
    id: number;
    collectUrl: string;
    collectRemark: string;
    //：0-有效 1-失效
    status: number;
    // 0-分享收藏 1-钱包收藏
    collectType: number;
    coinType: string;
}


export function createColumns({ handleDelete }: { handleDelete: (rowData: Columns) => void }): DataTableColumns<Columns> {
    const { t } = useI18n()
    const { getCoinPictures } = useApp();
    function onDelete(rowData: Columns, e: Event) {
        e.stopPropagation()
        handleDelete(rowData)
    }
    function renderAddress({ status, collectType, coinType, collectUrl }: Columns): JSX.Element {
        if (status === 1) {
            return <span class="line-through">{collectUrl}</span>
        } else {
            const path = collectType ? `/miner/${coinType.toLocaleLowerCase()}/${collectUrl}` : `/share/${collectUrl}`
            return <RouterLink class="text-current" to={{ path }}><span class="font-semibold">{collectUrl}</span></RouterLink>
        }
    }
    return [
        {
            key: "coin",
            title: () => t("table.coin"),
            width: 140,
            render(rowData) {
                return (
                    <div class="flex items-center">
                        <NAvatar src={getCoinPictures.get(rowData.coinType.toUpperCase())} round size={45}></NAvatar>
                        <span class="ml-3">{rowData.coinType}</span>
                    </div>
                )
            }
        },
        {
            key: "address",
            width: 180,
            ellipsis: {
                tooltip: true,
            },
            className: "!text-black",
            align: "right",
            title: () => t("table.address"),
            render: renderAddress
        },
        {
            key: "status",
            width: 120,
            align: "right",
            title: () => t("table.state"),
            render: (rowData) => {
                return !rowData.status ? <NSpace justify="end"><NBadge type="success" dot></NBadge>正常</NSpace> : <NSpace justify="end"><NBadge color="grey" dot></NBadge>失效</NSpace>
            }
        },
        {
            key: "type",
            width: 120,
            align: "right",
            title: () => t("table.type"),
            render: (rowData) => {
                return rowData.collectType ? '钱包' : '分享'
            }
        },
        {
            key: "collectRemark",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
            align: "right",
            title: () => t("table.remark"),
        },
        {
            key: 'actions',
            align: "right",
            fixed: 'right',
            width: 150,
            render(row) {
                return (
                    <NSpace justify="end">
                        <EditFormButton data={row}></EditFormButton>
                        <NButton tertiary onClick={onDelete.bind(null, row)} circle type="warning" v-slots={{ icon: () => <NIcon component={TrashOutline} /> }}></NButton>
                    </NSpace>
                )
            }
        }
    ]
}

