/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 14:46:26
 * @LastEditTime: 2022-03-16 16:15:06
 */

import { formatHashrate } from "@/utils/tools"
import { AlertCircleOutline } from "@vicons/ionicons5"
import { NCard, NGi, NGrid, NIcon, NNumberAnimation, NStatistic, NTooltip } from "naive-ui"
import { defineComponent, PropType } from "vue"

export default defineComponent({
    name: "Summary",
    props: {
        data: {
            type: Object as PropType<{
                lucky?: number,
                networkDifficulty?: number,
                avgLucky?: number,
                networkHashRate?: number
            }>,
            default: () => ({
                lucky: 0,
                networkDifficulty: 0,
                avgLucky: 0,
                networkHashRate: 0,
            })
        }
    },
    computed: {
        networkHash() {
            return formatHashrate(this.data.networkHashRate).split(" ")
        },
        networkDifficulty() {
            return formatHashrate(this.data.networkDifficulty).split(" ")
        }
    },
    render() {
        return (
            <div class="flex">
                <NGrid cols={4} responsive="screen" itemResponsive={true}>
                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic v-slots={{ suffix: () => <span class="text-light">%</span>, label: () => <span>{this.$t("statistic.averageLuck")}<NTooltip v-slots={{ trigger: () => <NIcon size={14} component={AlertCircleOutline} /> }}>过去30天区块平均幸运值。</NTooltip></span> }}>
                                <span class="text-light"> <NNumberAnimation showSeparator from={0} to={this.data.avgLucky}></NNumberAnimation></span>
                            </NStatistic>

                        </NCard>
                    </NGi>

                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic v-slots={{ suffix: () => <span class="text-green-300">%</span>, label: () => <span>{this.$t("statistic.current")}<NTooltip v-slots={{ trigger: () => <NIcon size={14} component={AlertCircleOutline} /> }}>下一个区块当前的幸运值，实时更新。</NTooltip></span> }}>
                                <span class=" text-green-300"> <NNumberAnimation showSeparator from={0} to={this.data.lucky}></NNumberAnimation></span>
                            </NStatistic>
                        </NCard>
                    </NGi>
                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic label={this.$t("statistic.nethashrate")} v-slots={{ suffix: () => <span class="text-light">{this.networkHash[1]}</span> }}>
                                <span class="text-light"> <NNumberAnimation showSeparator from={0} to={Number(this.networkHash[0])}></NNumberAnimation></span>
                            </NStatistic>
                        </NCard>
                    </NGi>
                    <NGi span="2 m:1" class="m-2">
                        <NCard class="rounded-md border-light">
                            <NStatistic label={this.$t("statistic.netdifficulty")} v-slots={{ suffix: () => <span class="text-light">{this.networkDifficulty[1]}/s</span> }}>
                                <span class="text-light">  <NNumberAnimation showSeparator from={0} to={Number(this.networkDifficulty[0])}></NNumberAnimation></span>
                            </NStatistic>
                        </NCard>
                    </NGi>
                </NGrid>
            </div>
        )
    }
})