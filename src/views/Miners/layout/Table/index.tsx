/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-03-14 17:46:11
 */

import { useService } from "@/hooks";
import { getWorkerMinerTop } from "@/service/api";
import { useApp } from "@/store";
import { NDataTable } from "naive-ui";
import { storeToRefs } from "pinia";
import { defineComponent, watch } from "vue";
import { createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {
        const { coin } = storeToRefs(useApp())
        const tableService = useService(getWorkerMinerTop, { defaultValue: [] });
        watch(coin, (value) => tableService.run(value.toLowerCase()), { immediate: true })

        return {
            columns: createColumns(),
            tableService
        }
    },
    render() {
        return (
            <div>
                <h2>{this.$t("title.maxMiner")}</h2>
                <NDataTable class="mt-5 table-base" scrollX={900} loading={this.tableService.loading} data={this.tableService.data} pagination={false} columns={this.columns} size="large" />
            </div>
        )
    }
})