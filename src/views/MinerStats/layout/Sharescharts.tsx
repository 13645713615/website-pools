/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 13:37:13
 * @LastEditTime: 2022-05-06 11:17:51
 */

import Charts, { PropsOption } from "@/components/Charts";
import columnar from "@/components/Charts/type/columnar";
import RadioGroupButton from "@/components/RadioGroupButton";
import { useService } from "@/hooks";
import { getUserSharesDay, getWorkersharesDay } from "@/service/api";
import { ProvideLoad, ProvideWalletInfo } from "@/views/Miner/provide";
import { NCard } from "naive-ui";
import { defineComponent, inject, onMounted, ref, shallowReactive, watch } from "vue";
import { useI18n } from "vue-i18n"
import { ProvideWorker } from "../provide";


export default defineComponent({
    name: "Sharescharts",
    setup() {
        const date = ref<Number>(1);
        const { t } = useI18n();
        const onload = inject(ProvideLoad);
        const walletInfo = inject(ProvideWalletInfo);
        const worker = inject(ProvideWorker);
        async function getSharesDay(params: Record<string, any>) {
            return await worker.value ? getWorkersharesDay.apply(null, [{ ...params, workerName: worker.value }]) : getUserSharesDay.apply(null, [params])
        }
        const UserShareschartsData = shallowReactive<PropsOption>({ xData: [], yData: [], legend: [t("title.valid"),t("title.invalid"), t("title.stale")] });
        const UserSharesService = useService<string[][]>(getSharesDay, {
            defaultValue: [[], [], [], []],
            params() {
                const { coin, wallet: accountName, token } = walletInfo.value;
                return { coin, accountName, token, day: date.value }
            },
        }, (data) => { [UserShareschartsData.xData, ...UserShareschartsData.yData] = data });

        onMounted(() => {
            onload().subscribe(() => UserSharesService.run())
            watch(worker, () => UserSharesService.run(), { immediate: true });
        });

        return {
            UserShareschartsData,
            date,
            filterOptions: [{ label: "日", key: 1 }, { label: "周", key: 7 }, { label: "月", key: 30 }],
            handleChangeDay() {
                UserSharesService.run()
            }
        }
    },
    render() {
        return (
            <NCard>
                <div class="flex items-center justify-between my-[0.83em]">
                    <i class="flex-1 hidden md:inline"></i>
                    <h2 class="text-center m-0">{this.$t("title.shares")}</h2>
                    <span class="flex-1 text-right">
                        <RadioGroupButton v-model={[this.date, "value"]} onChange={this.handleChangeDay} options={this.filterOptions}></RadioGroupButton>
                    </span>
                </div>
                <Charts class="pt-4" color={["#0069FF", "#e21d26", "#ff9d4d"]} data={this.UserShareschartsData} construct={columnar} style={{ height: "300px" }} />
            </NCard>
        )
    }
})