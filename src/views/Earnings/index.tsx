/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-20 17:00:28
 * @LastEditTime: 2022-07-18 15:38:18
 */

import ExportButton from "@/components/ExportButton";
import { Page, useService } from "@/hooks";
import { userAccountProfit } from "@/service/api";
import { NCard, NSpace } from "naive-ui";
import { defineComponent, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import Filter, { FilterParams } from "./layout/Filter";
import Table from "./layout/Table";

export default defineComponent({
    name: "Earnings",
    setup() {
        const { t } = useI18n()
        const coins = ref<string[]>([]);

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
                params.current = 0;
                params.size = pageSize
                service.run()
            }
        }
        return () => (
            <div>
                <div class="text-right md:absolute top-0 right-0 min-h-[40px] leading-[40px]">
                    <NSpace>
                        <ExportButton path="#earnings-table table" fileName="earnings">{t("button.export")}</ExportButton>
                    </NSpace>
                </div>
                <NCard class="mt-6">
                    <div>
                        <Filter coins={coins.value} onChange={handle.onChange}></Filter>
                        <Table {...{ id: "earnings-table" }} onUpdatePage={handle.onUpdatePage} onUpdatePageSize={handle.onUpdatePageSize} type={params.type} class="mt-6" loading={service.loading} data={service.data}></Table>
                    </div>
                </NCard>
            </div>
        )
    }
})