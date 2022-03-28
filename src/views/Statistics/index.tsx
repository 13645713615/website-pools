/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 13:50:25
 * @LastEditTime: 2022-03-19 15:52:28
 */

import Charts, { PropsOption } from "@/components/Charts";
import Container from "@/layout/Container";
import { NCard, NSpace } from "naive-ui";
import { defineComponent, shallowReactive, watch } from "vue";
import Summary from "./layout/Summary";
import brokenline from "@/components/Charts/type/brokenline"
import CoinSwitch from "@/components/CoinSwitch";
import { useApp } from "@/store";
import { storeToRefs } from "pinia";
import { useService } from "@/hooks";
import { getPoolHash } from "@/service/api";
import Subscriber from "@/layout/Subscriber";
import { useI18n } from "vue-i18n";
export default defineComponent({
    name: "Statistics",
    setup() {
        const { coin } = storeToRefs(useApp())
        const { t } = useI18n()
        const chartsData = shallowReactive<PropsOption>({
            xData: [],
            yData: [],
            legend: [t("title.hashrate")]
        });
        const service = useService<string[][]>(getPoolHash, { defaultValue: [[], []] }, (data) => {
            [chartsData.xData, ...chartsData.yData] = data
        })

        watch(coin, (value) => service.run(value.toLowerCase()), { immediate: true })

        return {
            chartsData,
        }
    },
    render() {
        return (
            <Subscriber>
                <NSpace align="center">
                    <h3 class="text-white text-2xl">{this.$t("title.statistics")}</h3> <CoinSwitch size="large" />
                </NSpace>
                <NCard>
                    <Summary />
                    <h2 class="text-center">{this.$t("title.hashrate")}</h2>
                    <Charts class="pt-4" data={this.chartsData} construct={brokenline} style={{ height: "400px" }} />
                </NCard>
            </Subscriber>
        )
    }
})