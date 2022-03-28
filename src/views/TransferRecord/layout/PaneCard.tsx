/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-12 10:38:43
 * @LastEditTime: 2022-03-17 15:16:14
 */

import { useService } from "@/hooks";
import { getEarningPanel } from "@/service/api";
import { ProvideLoad, ProvideWalletInfo } from "@/views/Miner/provide";
import { NGrid, NGi, NCard, NSpace } from "naive-ui";
import { computed, defineComponent, inject, onMounted } from "vue";

export default defineComponent({
    name: "PaneCard",
    setup() {
        const onload = inject(ProvideLoad);
        const walletInfo = inject(ProvideWalletInfo);
        const paneService = useService<Record<string, any>>(getEarningPanel, {
            defaultValue: {}, immediate: true,
            params() {
                const { coin, wallet: accountName, token } = walletInfo.value;
                return { coin, accountName, token }
            }
        })
        onMounted(() => onload().subscribe(() => paneService.run()))

        return {
            paneData: computed(() => paneService.data),
            coin: computed(() => walletInfo.value?.coin.toUpperCase())
        }
    },
    render() {
        return (
            <NGrid xGap={16} yGap={16} cols={12} responsive="screen" itemResponsive={true}>
                <NGi span="12 m:5 l:3">
                    <NCard title={this.$t("title.latestRevenue")} class="h-full">
                        <div class="text-gray-500">{this.$t("statistic.profit")}({this.coin}）</div>
                        <NSpace align="center">
                            <strong class="font-medium text-2xl">{this.paneData.nowDayMoney || "--"}</strong>
                            <span class="mt-2 text-gray-500 text-base">≈{this.paneData.nowDayMoney_RMB || "--"}</span>
                        </NSpace>
                    </NCard>
                </NGi>
                <NGi span="12 m:7 l:4">
                    <NCard title={this.$t("title.computational")} class="h-full">
                        <NSpace align="center" justify="space-between">
                            <div>
                                <span class="text-gray-500">{this.$t("statistic.avgeffective")}</span>
                                <strong class="font-medium block text-2xl">{this.paneData.hash24Hour || "--"}</strong>
                            </div>
                            <div>
                                <span class="text-gray-500">{this.$t("statistic.yesterdayAvgeffective")}</span>
                                <strong class="font-medium block text-2xl">{this.paneData.yesMinspeed || "--"}</strong>
                            </div>
                        </NSpace>
                    </NCard>
                </NGi>
                <NGi span="12 m:12 l:5">
                    <NCard title={this.$t("title.incomeStatistics")} class="h-full">
                        <NSpace align="center" justify="space-between" wrap={false}>
                            <div>
                                <div class="text-gray-500">{this.$t("statistic.yesterdayearnings")}</div>
                                <NSpace align="center">
                                    <strong class="font-medium text-2xl">{this.paneData.yesReward || "--"}</strong>
                                    <span class="mt-2 text-gray-500 text-base">≈{this.paneData.yesReward_RMB || "--"}</span>
                                </NSpace>
                            </div>
                            <div>
                                <div class="text-gray-500">{this.$t("statistic.total")}({this.coin}）</div>
                                <NSpace align="center">
                                    <strong class="font-medium text-2xl">{this.paneData.amountAll || "--"}</strong>
                                    <span class="mt-2 text-gray-500 text-base">≈{this.paneData.amountAll_RMB || "--"}</span>
                                </NSpace>
                            </div>
                        </NSpace>
                    </NCard>
                </NGi>
            </NGrid>
        )
    }
})