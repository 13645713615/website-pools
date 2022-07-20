/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 14:46:26
 * @LastEditTime: 2022-07-20 10:28:44
 */

import { getIndexPool } from "@/service/api"
import { useApp } from "@/store"
import { AlertCircleOutline } from "@vicons/ionicons5"
import { NCard, NGi, NGrid, NIcon, NNumberAnimation, NStatistic, NTooltip } from "naive-ui"
import { storeToRefs } from "pinia"
import { computed, defineComponent, ref } from "vue"

interface PoolInfo {
    coinUnit: string,
    lucky: number,
    activeminers: number,
    activeworkers: number,
    hashrate: string
}

function usePoolInfoByCoin() {
    const source = ref<Map<PickAttr<PoolInfo, "coinUnit">, PoolInfo>>(new Map())
    getIndexPool().then(({ data }) => {
        source.value = new Map((data as PoolInfo[])?.map<[PickAttr<PoolInfo, "coinUnit">, PoolInfo]>((item) => [item.coinUnit, item]))
    })
    return source
}

export default defineComponent({
    name: "Summary",
    setup() {
        const poolInfo = usePoolInfoByCoin();
        const { coin } = storeToRefs(useApp())
        const poolCoinInfo = computed<PoolInfo>(() => poolInfo.value.get(coin.value))
        return {
            poolCoinInfo,
            hashrate: computed<[number, string]>(() => {
                const vlaue = poolCoinInfo.value?.hashrate || "H";
                return [parseFloat(vlaue) || 0, vlaue.substr(-2)]
            })
        }
    },
    render() {
        return (
            <div class="flex">
                <NGrid cols={4} responsive="screen" itemResponsive={true}>
                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic label={this.$t("statistic.hashrate")} v-slots={{ suffix: () => <span class="text-light md:text-2xl text-xs" >{this.hashrate[1]}/s</span> }}>
                                <span class="text-light">  <NNumberAnimation showSeparator precision={2} from={0} to={Number(this.hashrate[0] | 0)}></NNumberAnimation></span>
                            </NStatistic>
                        </NCard>
                    </NGi>

                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic v-slots={{ suffix: () => <span class="text-green-300 md:text-2xl text-xs">%</span>, label: () => <span class="whitespace-nowrap">{this.$t("statistic.averageLuck")}<NTooltip v-slots={{ trigger: () => <NIcon size={14} component={AlertCircleOutline} /> }}>过去30天区块平均幸运值。</NTooltip></span> }}>
                                <span class=" text-green-300"> <NNumberAnimation showSeparator from={0} to={Number(this.poolCoinInfo?.lucky | 0)}></NNumberAnimation></span>
                            </NStatistic>
                        </NCard>
                    </NGi>
                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic label={this.$t("statistic.miners")}>
                                <span class="text-light"> <NNumberAnimation showSeparator from={0} to={Number(this.poolCoinInfo?.activeminers || 0)}></NNumberAnimation></span>
                            </NStatistic>
                        </NCard>
                    </NGi>
                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic label={this.$t("statistic.workers")}>
                                <span class="text-light">  <NNumberAnimation showSeparator from={0} to={Number(this.poolCoinInfo?.activeworkers | 0)}></NNumberAnimation></span>
                            </NStatistic>
                        </NCard>
                    </NGi>
                </NGrid>
            </div>
        )
    }
})