/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 13:50:25
 * @LastEditTime: 2022-05-16 09:27:38
 */

import Charts, { PropsOption } from "@/components/Charts";
import Container from "@/layout/Container";
import { NCard, NSpace } from "naive-ui";
import { defineComponent, ref, shallowReactive, watch } from "vue";
import Summary from "./layout/Summary";
import blendline from "@/components/Charts/type/blendline"
import CoinSwitch from "@/components/CoinSwitch";
import Table from "./layout/Table";
import Subscriber from "@/layout/Subscriber";
import { storeToRefs } from "pinia";
import { useService } from "@/hooks";
import { getPoolBlock } from "@/service/api";
import { useApp } from "@/store";
import { useI18n } from "vue-i18n";

interface PanelData {
    lucky: number,
    networkDifficulty: number,
    avgLucky: number,
    networkHashRate: number
}

interface Service extends PanelData {
    arr: string[][]
}

export default defineComponent({
    name: "Blocks",
    setup() {
        const { coin } = storeToRefs(useApp())
        const { t } = useI18n()
        const chartsData = shallowReactive<PropsOption>({
            xData: [],
            yData: [],
            legend: [t("title.poolDifficulty") , t("title.poolBlocks")]
        });

        const panelData = ref<PanelData>(undefined)

        const service = useService<Service>(getPoolBlock, {
            defaultValue: {
                arr: [[], []],
                lucky: 0,
                networkDifficulty: 0,
                avgLucky: 0,
                networkHashRate: 0,
            },
        }, ({ arr, ...data }) => {
            [chartsData.xData, ...chartsData.yData] = arr;
            panelData.value = data
        })

        watch(coin, (value) => service.run(value.toLowerCase()), { immediate: true })

        return {
            panelData,
            chartsData,
            coin,
        }
    },
    render() {
        return (
            <>
                <Subscriber>
                    <NSpace align="center">
                        <h3 class="text-white text-2xl">{this.$t("title.blocks")}</h3> <CoinSwitch size="large" />
                    </NSpace>
                    <NCard>
                        <Summary data={this.panelData} />
                        <h2 class="text-center">{this.$t("title.history")}</h2>
                        <Charts class="pt-4" data={this.chartsData} construct={blendline} style={{ height: "400px" }} />
                    </NCard>
                </Subscriber>
                <div class="pt-5 pb-12">
                    <Container >
                        <Table></Table>
                    </Container>
                </div>
            </>
        )
    }
})