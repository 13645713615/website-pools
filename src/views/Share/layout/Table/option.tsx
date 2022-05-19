/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 13:15:49
 * @LastEditTime: 2022-05-19 10:27:03
 */


import { useApp } from "@/store";
import { DataTableColumns, NButton, NIcon, NSpace, NTag, useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import moduleOptions from "@/views/Miner/module"
import { deepClone, deepForEach } from "@/utils/tools";
import { Copy, Create, Trash } from "@vicons/ionicons5";
import { useUpdateSharel } from "../Create";
import useClipboard from 'vue-clipboard3'
export interface Columns {
    accountName: string;
    coin: string;
    key: string;
    time: number;
    type: string;
    remark: string;
}


export function createColumns({ handleDelete }: { handleDelete: (row: Columns) => void }): DataTableColumns<Columns> {
    const { t } = useI18n()
    const message = useMessage()
    const { toClipboard } = useClipboard()
    const moduleTagsMap = new Map();
    deepForEach(deepClone(moduleOptions), "children", (data) => {
        moduleTagsMap.set(data.key, data.label)
    })

    function handleCopy(value: string) {
        toClipboard(`${location.origin}/share/${value}`).then(() => {
            message.success(t("tip.copy"))
        })
    }

    return [
        {
            key: "remark",
            width: 180,
            ellipsis: {
                tooltip: true
            },
            title: () => t("table.remark", "备注"),
        },
        {
            key: "url",
            width: 200,
            title: () => t("table.url", "分享地址"),
            render: (rowData) => {
                return <NSpace align="center">{`share/${rowData.key}`}<NButton size="small" secondary circle class="align-middle" onClick={handleCopy.bind(null, rowData.key)}  ><NIcon size={14} component={Copy} /> </NButton></NSpace>
            }
        },
        {
            key: "module",
            title: () => t("table.module", "分享模块"),
            render: (rowData) => <NSpace>{rowData.type.split(",").map((key => <NTag>{moduleTagsMap.get(key)}</NTag>))}</NSpace>
        },
        {
            key: 'actions',
            fixed: 'right',
            width: 150,
            render(rowData) {
                return (
                    <NSpace justify="end">
                        <NButton onClick={useUpdateSharel.bind(null, rowData)} tertiary circle type="info" v-slots={{ icon: () => <NIcon component={Create} /> }} />
                        <NButton onClick={handleDelete.bind(null, rowData)} tertiary circle type="warning" v-slots={{ icon: () => <NIcon component={Trash} /> }} />
                    </NSpace>
                )
            }
        }
    ]
}


