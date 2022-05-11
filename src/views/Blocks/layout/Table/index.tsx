/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-05-11 14:52:03
 */

import { useService, Page, useFnReactive } from "@/hooks";
import { getPoolBlockList } from "@/service/api";
import { useApp } from "@/store";
import { NCard, NDataTable, NPagination } from "naive-ui";
import { storeToRefs } from "pinia";
import { defineComponent, watch } from "vue";
import { createColumns } from "./option";
import SetData from "./SetData";

export default defineComponent({
    name: "Table",
    setup() {
        const { coin } = storeToRefs(useApp())
        const setData = useFnReactive(new SetData());
        const tableData = useService<Page<Record<string, any>[]>>(getPoolBlockList, { params: () => ({ coin: coin.value.toLowerCase(), pageNum: setData.pageNo, pageSize: setData.pageSize }), defaultValue: new Page<Record<string, any>[]>() },(data)=>{
            setData.itemCount = data.total
        });

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
                <NDataTable class="mt-5 table-base" scrollX={1100} loading={this.tableData.loading} data={this.tableData.data.records} pagination={false} columns={this.columns} size="large" />
                <NCard size="small" class="mt-1"><NPagination  {...this.setData} page={this.setData.page}></NPagination></NCard>
            </div>
        )
    }
})