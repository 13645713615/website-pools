/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 13:32:57
 * @LastEditTime: 2022-03-27 11:09:02
 */

import Charts, { PropsOption } from "@/components/Charts";
import brokenline from "@/components/Charts/type/brokenline";
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
            userHashchartsData
        }
    },
    render() {
        return (
            <NCard>
                <h2 class="text-center">{this.$t("title.minerHashrate")}</h2>
                <Charts class="pt-4" color={["#000000", "#0069FF"]} data={this.userHashchartsData} construct={brokenline} style={{ height: "300px" }} />
            </NCard>
        )
    }
})