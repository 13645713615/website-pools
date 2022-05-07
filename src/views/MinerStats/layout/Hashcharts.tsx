/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 13:32:57
 * @LastEditTime: 2022-04-20 15:21:44
 */

import Charts, { PropsOption } from "@/components/Charts";
import brokenline from "@/components/Charts/type/brokenline";
import RadioGroupButton, { RadioGroupButtonOption } from "@/components/RadioGroupButton";
import { useService } from "@/hooks";
import { getUserHashByDay, getWorkerHashByDay } from "@/service/api";
import { ProvideLoad, ProvideWalletInfo } from "@/views/Miner/provide";
import { NCard } from "naive-ui";
import { defineComponent, inject, onMounted, ref, shallowReactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { ProvideWorker } from "../provide";



export default defineComponent({
    name: "Hashcharts",
    setup() {
        const { t } = useI18n();
        const date = ref<Number>(1);
        const onload = inject(ProvideLoad);
        const walletInfo = inject(ProvideWalletInfo);
        const worker = inject(ProvideWorker);
        const filterOptions: RadioGroupButtonOption[] = [{ label: "日", key: 1 }, { label: "周", key: 7 }, { label: "月", key: 30 }]
        async function getHashByDay(params: Record<string, any>) {
            return await worker.value ? getWorkerHashByDay.apply(null, [{ ...params, workerName: worker.value }]) : getUserHashByDay.apply(null, [params])
        }
        const userHashchartsData = shallowReactive<PropsOption>({ xData: [], yData: [], legend: [t("title.avgeffective"), t("title.reported"),] });
        const userHashService = useService<string[][]>(getHashByDay, {
            defaultValue: [[], [], []],
            params() {
                const { coin, wallet: accountName, token } = walletInfo.value;
                return { coin, accountName, token, day: date.value }
            },
        }, (data) => { [userHashchartsData.xData, ...userHashchartsData.yData] = data });

        onMounted(() => {
            onload().subscribe(() => userHashService.run())
            watch(worker, () => userHashService.run(), { immediate: true })
        });

        return {
            userHashchartsData,
            date,
            filterOptions,
            handleChangeDay() {
                userHashService.run()
            }
        }
    },
    render() {
        return (
            <NCard>
                <div class="flex items-center justify-between my-[0.83em]">
                    <i class="flex-1 hidden md:inline"></i>
                    <h2 class="text-center m-0">{this.$t("title.minerHashrate")}</h2>
                    <span class="flex-1 text-right">
                        <RadioGroupButton v-model={[this.date, "value"]} onChange={this.handleChangeDay} options={this.filterOptions}></RadioGroupButton>
                    </span>
                </div>
                <Charts class="pt-4" color={["#000000", "#0069FF"]} data={this.userHashchartsData} construct={brokenline} style={{ height: "300px" }} />
            </NCard>
        )
    }
})