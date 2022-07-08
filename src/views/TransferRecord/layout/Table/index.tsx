/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-07-08 17:42:09
 */

import { useFnReactive } from "@/hooks";
import { IRes, Page, useService } from "@/hooks/service";
import { getSettlementList } from "@/service/api";
import { ProvideLoad } from "@/views/Miner/provide";
import { NButton, NCard, NDataTable, NDatePicker, NPagination, NSpace } from "naive-ui";
import { defineComponent, inject, onMounted, } from "vue";
import { Columns, createColumns, dataFormat } from "./option";
import SetData from "./SetData";
import { utils, write } from 'xlsx'
import FileSaver from 'file-saver'
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "Table",
    setup() {
        const { t } = useI18n()
        const onload = inject(ProvideLoad);

        const workerSearch = useFnReactive(new SetData());

        const tableData = useService<Page<Columns>>(getSettlementList, {
            immediate: true,
            params: () => workerSearch.getData(),
            defaultValue: new Page<Columns>()
        }, (data) => {
            workerSearch.itemCount = data.total
        });

        onMounted(() => onload().subscribe(() => tableData.run()));

        workerSearch.on(() => tableData.run())
        const columns = createColumns()
        return {
            workerSearch,
            columns,
            tableData,
            dateDisabled: (ts: number) => {
                return ts < 1651363200000
            },
            handleExport: () => {
                const header = [t("table.dateStr"), t("table.avgHashrate"), t("table.totalReward"), t("table.mev"), t("table.txFree"), t("table.blockReward"), t("table.state"),]
                getSettlementList({ ...workerSearch.getData(), current: 1, szie: workerSearch.itemCount, month: "" }).then((res: IRes<Page<Columns>>) => {
                    if (res.status == 200) {
                        const body = res.data.records?.map(dataFormat);
                        console.log(body)
                        const worksheet = utils.aoa_to_sheet([header, ...body])
                        FileSaver.saveAs(new Blob([write({ Sheets: { a: worksheet }, SheetNames: ["a"] }, { bookType: 'xlsx', bookSST: true, type: 'array' })], { type: 'application/octet-stream' }), `收益.xlsx`);
                    }
                })
            }
        }
    },
    render() {
        return (
            <div>
                <div class="flex justify-between items-center mb-3 mt-8">
                    <h2>{this.$t("title.settlementtable")}</h2>
                    <NSpace>
                        <NDatePicker isDateDisabled={this.dateDisabled} format="yyyy-MM" onUpdateFormattedValue={this.workerSearch.onUpdateMonth} type="month" clearable></NDatePicker>
                        <NButton type="primary" onClick={this.handleExport}>{this.$t("button.export")}</NButton>
                    </NSpace>
                </div>
                <NDataTable class="table-base" scrollX={660} loading={this.tableData.loading} data={this.tableData.data.records} columns={this.columns} size="large" />
                <NCard size="small" class="mt-1"><NPagination  {...this.workerSearch} page={this.workerSearch.page}></NPagination></NCard>
            </div>
        )
    }
})