/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-12 09:54:44
 * @LastEditTime: 2022-03-17 15:24:54
 */

import Charts, { PropsOption } from "@/components/Charts";
import wave from "@/components/Charts/type/wave";
import { useService } from "@/hooks";
import { getEarningChart } from "@/service/api";
import { ProvideLoad, ProvideWalletInfo } from "@/views/Miner/provide";
import { NCard } from "naive-ui";
import { defineComponent, inject, onMounted,  shallowReactive } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "EarningCharts",
    setup() {
        const {t} = useI18n();
        const onload = inject(ProvideLoad);
        const walletInfo = inject(ProvideWalletInfo);
        const earningchartsData = shallowReactive<PropsOption>({ xData: [], yData: [], legend: [t("title.rewards")] });
        const earningService = useService<string[][]>(getEarningChart, {
            defaultValue: [[], []], immediate: true,
            params() {
                const { coin, wallet: accountName, token } = walletInfo.value;
                return { coin, accountName, token }
            },
        }, (data) => { [earningchartsData.xData, ...earningchartsData.yData] = data });
        onMounted(() => onload().subscribe(() => earningService.run()))
        return {
            earningchartsData
        }
    },
    render() {
        return (
            <NCard>
                <h2 class="text-center">{this.$t("title.RealTimeEarnings")}</h2>
                <Charts class="pt-4" color={["#0069FF"]} data={this.earningchartsData} construct={wave} style={{ height: "300px" }} />
            </NCard>
        )
    }
})