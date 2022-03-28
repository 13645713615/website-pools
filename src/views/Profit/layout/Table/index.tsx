/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-03-17 14:59:17
 */

import { Page, useService } from "@/hooks/service";
import { getPaymentList } from "@/service/api";
import { ProvideLoad } from "@/views/Miner/provide";
import { NDataTable, NSpace } from "naive-ui";
import { defineComponent, inject, onMounted, reactive } from "vue";
import { createColumns } from "./option";
import SetData from "./SetData";

export default defineComponent({
    name: "Table",
    setup() {
        const onload = inject(ProvideLoad);
        const paymentSearch = reactive(new SetData());
        const tableData = useService<Page<Record<string, any>[]>>(getPaymentList, { immediate: true, params: () => paymentSearch.getData(), defaultValue: new Page<Record<string, any>[]>() }, (data) => {
            paymentSearch.itemCount = data.pages
        });

        paymentSearch.on(() => tableData.run())
        onMounted(()=> onload().subscribe(() => tableData.run()));

        return {
            columns: createColumns(),
            tableData,
            paymentSearch
        }
    },
    render() {
        return (
            <div>
                <NSpace class="mb-3 mt-8" align="center">
                    <h2>{this.$t("title.transaction")}</h2>
                </NSpace>
                <NDataTable class="table-base" pagination={this.paymentSearch} scrollX={1100} loading={this.tableData.loading} data={this.tableData.data.records} columns={this.columns} size="large" />
            </div>
        )
    }
})