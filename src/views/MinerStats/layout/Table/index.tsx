/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-03-27 12:03:07
 */

import { useFnReactive } from "@/hooks";
import { Page, useService } from "@/hooks/service";
import { getworkerlist } from "@/service/api";
import { ProvideLoad } from "@/views/Miner/provide";
import { Search } from "@vicons/ionicons5";
import { NButton, NCard, NDataTable, NIcon, NInput, NPagination, NSpace } from "naive-ui";
import { defineComponent, inject, onMounted, PropType, watch } from "vue";
import { useRoute } from "vue-router";
import { Columns, createColumns } from "./option";
import SetData from "./SetData";

class WorkerPage<T> extends Page<T> {
    offline: number
    online: number
}

export default defineComponent({
    name: "Table",
    props: {
        onClick: Function as PropType<(rowData: Columns) => void>
    },
    emits: {
        click: (_c: Columns) => true
    },
    setup(_, context) {
        const route = useRoute();
        const onload = inject(ProvideLoad);
        const workerSearch = useFnReactive(new SetData());
        const tableData = useService<WorkerPage<Columns>>(getworkerlist, { immediate: true, params: () => workerSearch.getData(), defaultValue: new WorkerPage<Columns>() }, (data) => {
            workerSearch.itemCount = data.total
        });
        const handleWatchStop = watch(() => tableData.data, (value) => {
            if (route.query.worker && value.records) {
                const rowData = value.records.find((item) => item.worker === route.query.worker);
                if (rowData) {
                    handleClickWorker(rowData)
                }
            }
            handleWatchStop()
        })
        workerSearch.on(() => tableData.run())
        onMounted(() => onload().subscribe(() => tableData.run()));

        function handleClickWorker(rowData: Columns) {
            context.emit("click", rowData)
        }

        return {
            columns: createColumns({ handleClickWorker }),
            tableData,
            workerSearch,
            handleKeydown(e: KeyboardEvent) {
                if (e.code === "Enter") {
                    tableData.run();
                }
            },
        }
    },
    render() {
        return (
            <div>
                <NSpace class="mb-3 mt-8" align="center">
                    <h2>
                        {this.$t("title.workers")}
                        （ <NButton text onClick={() => this.workerSearch.onUpdateType(2)} class="text-2xl pr-2">{this.tableData.data.online || 0}</NButton>
                        <NButton text onClick={() => this.workerSearch.onUpdateType(3)} class="text-2xl text-gray-500">/ {this.tableData.data.offline || 0}</NButton> ）
                    </h2>
                    <NInput type="text" class="simplicity-inupt" onKeydown={this.handleKeydown} v-model={[this.workerSearch.millName, "value"]} v-slots={{ prefix: () => <NIcon size={18} color="#404a59" component={Search} /> }}></NInput>
                </NSpace>
                <NDataTable class="table-base" onUpdate:sorter={this.workerSearch.onSorter} scrollX={1100} loading={this.tableData.loading} data={this.tableData.data.records} columns={this.columns} size="large" />
                <NCard size="small" class="mt-1"><NPagination  {...this.workerSearch} page={this.workerSearch.page}></NPagination></NCard>
            </div>
        )
    }
})