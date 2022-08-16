/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-20 17:00:28
 * @LastEditTime: 2022-08-12 17:30:45
 */

import ExportButton from "@/components/ExportButton";
import { IPage, IRes, Page, useService } from "@/hooks";
import { userAccountProfit } from "@/service/api";
import { exportDataTable, exportTable } from "@/utils/export";
import { NButton, NCard, NDropdown, NSpace } from "naive-ui";
import { defineComponent, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import Filter, { FilterParams } from "./layout/Filter";
import Table from "./layout/Table";



const exportOptions: Array<{ label: string, key: "all" | "page" }> = [{ label: "当前页", key: "page" }, { label: "全部", key: "all" }]

export default defineComponent({
    name: "Earnings",
    setup() {
        const { t } = useI18n()
        const coins = ref<string[]>([]);
        const tableRefs = ref<any>(null);
        const params: FilterParams & { current: number, size: number } = reactive({
            type: '1',
            coin: "All",
            current: 1,
            size: 10
        })

        const service = useService<Page<any>>(userAccountProfit, { params: () => params, defaultValue: new Page() }, (data) => {
            const set = new Set<string>();
            data.records.forEach((item) => set.add(item.coin.toUpperCase()));
            coins.value = [...set];
        })

        const loadingExport = ref<boolean>(false)

        const handle = {
            onChange: (value: FilterParams) => {
                Object.assign(params, value)
                service.run()
            },
            onUpdatePage: (page: number) => {
                params.current = page;
                service.run()
            },
            onUpdatePageSize: (pageSize: number) => {
                params.current = 1;
                params.size = pageSize
                service.run()
            },
            onExport: async (value: "all" | "page") => {
                loadingExport.value = true
                switch (value) {
                    case "all":
                        const { data: { records } }: IRes<IPage<any>> = await userAccountProfit({ ...params, current: 1, size: service.data.total })
                        exportDataTable({ data: records, columns: tableRefs.value?.columns }, "earnings");
                        break;
                    case "page":
                        exportTable("#earnings-table table", "earnings");
                        break;
                    default:
                        break;
                }
                loadingExport.value = false;
            }
        }
        return () => (
            <div>
                <div class="text-right md:absolute top-0 right-0 min-h-[40px] leading-[40px]">
                    <NSpace>
                        <NDropdown options={exportOptions} onSelect={handle.onExport}>
                            <NButton loading={loadingExport.value} type="primary"> {t("button.export")}</NButton>
                        </NDropdown>
                    </NSpace>
                </div>
                <NCard class="mt-6">
                    <div>
                        <Filter coins={coins.value} onChange={handle.onChange}></Filter>
                        <Table {...{ id: "earnings-table" }} ref={(refs) => tableRefs.value = refs} onUpdatePage={handle.onUpdatePage} onUpdatePageSize={handle.onUpdatePageSize} type={params.type} class="mt-6" loading={service.loading} data={service.data}></Table>
                    </div>
                </NCard>
            </div>
        )
    }
})