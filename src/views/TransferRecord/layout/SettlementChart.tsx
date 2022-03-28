/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-12 10:19:08
 * @LastEditTime: 2022-03-17 15:24:53
 */
import Charts, { PropsOption } from "@/components/Charts";
import columnar from "@/components/Charts/type/columnar";
import { useService } from "@/hooks";
import { getSettlementChart } from "@/service/api";
import { ProvideLoad, ProvideWalletInfo } from "@/views/Miner/provide";
import { NCard } from "naive-ui";
import { defineComponent, inject, onMounted, shallowReactive } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "SettlementChart",
    setup() {
        const {t} = useI18n();
        const onload = inject(ProvideLoad);
        const walletInfo = inject(ProvideWalletInfo);
        const settlementchartsData = shallowReactive<PropsOption>({ xData: [], yData: [], legend: [t("title.miningIncome"), t("title.minerFeeIncome"), t("title.MEVIncome")] });
        const settlementService = useService<string[][]>(getSettlementChart, {
            defaultValue: [[], [], [], [],[]], immediate: true,
            params() {
                const { coin, wallet: accountName, token } = walletInfo.value;
                return { coin, accountName, token }
            },
        }, (data) => { [settlementchartsData.xData, ...settlementchartsData.yData] = data });
        onMounted(() => onload().subscribe(() => settlementService.run()))
        return {
            settlementchartsData
        }
    },
    render() {
        return (
            <NCard>
                <h2 class="text-center">{this.$t("title.Settlement")}</h2>
                <Charts class="pt-4" color={["#0069FF","#e21d26","#ff9d4d"]} data={this.settlementchartsData} construct={columnar} style={{ height: "300px" }} />
            </NCard>
        )
    }
})