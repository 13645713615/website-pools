/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-20 17:00:28
 * @LastEditTime: 2022-06-21 18:13:51
 */

import ExportButton from "@/components/ExportButton";
import { useService } from "@/hooks";
import { userAccountProfit } from "@/service/api";
import { NButton, NCard, NSpace } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import Filter, { FilterParams } from "./layout/Filter";
import Table from "./layout/Table";

export default defineComponent({
    name: "Earnings",
    setup() {
        const { t } = useI18n()
        const coins = ref<string[]>([]);
        const type = ref<string>();
        const service = useService(userAccountProfit, { params: { coin: "all" }, defaultValue: [] }, (data) => {
            const set = new Set<string>();
            data.forEach((item) => set.add(item.coin.toUpperCase()));
            coins.value = [...set];
        })

        const handle = {
            onChange: (value: FilterParams) => {
                service.run(value)
                type.value = value.type as string;
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
                        <Table {...{ id: "earnings-table" }} type={type.value} class="mt-6" loading={service.loading} data={service.data}></Table>
                    </div>
                </NCard>
            </div>
        )
    }
})