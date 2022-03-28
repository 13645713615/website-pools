/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-03-16 17:17:19
 */

import { useService, Page, useFnReactive } from "@/hooks";
import { getPoolBlockList } from "@/service/api";
import { useApp } from "@/store";
import { NDataTable } from "naive-ui";
import { storeToRefs } from "pinia";
import { defineComponent, watch } from "vue";
import { createColumns } from "./option";
import SetData from "./SetData";

export default defineComponent({
    name: "Table",
    setup() {
        const { coin } = storeToRefs(useApp())
        const setData = useFnReactive(new SetData());
        const tableData = useService<Page<Record<string, any>[]>>(getPoolBlockList, { params: () => ({ coin: coin.value.toLowerCase(), pageNum: setData.pageNo, pageSize: setData.pageSize }), defaultValue: new Page<Record<string, any>[]>() });

        setData.on(() => tableData.run())
        watch(coin, () => tableData.run(), { immediate: true })

        return {
            columns: createColumns(),
            tableData,
            setData
        }
    },
    render() {
        return (
            <div>
                <h2>{this.$t("title.history")}</h2>
                <NDataTable class="mt-5 table-base" scrollX={1160} loading={this.tableData.loading} data={this.tableData.data.records} pagination={this.setData} columns={this.columns} size="large" />
            </div>
        )
    }
})