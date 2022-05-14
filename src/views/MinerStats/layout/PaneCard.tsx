/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 13:49:37
 * @LastEditTime: 2022-05-14 11:31:13
 */

import { ProvidePaneData } from "@/views/Miner/provide";
import { RepeatSharp } from "@vicons/ionicons5";
import { NGrid, NGi, NCard, NSpace, NPopover, NTag, NIcon, NButton } from "naive-ui";
import { defineComponent, inject, computed, PropType, ref } from "vue";

export interface PaneDataProps {
    speed24hcount: number;
    speed24hinvalidcount: number;
    speed24hstalecount: number;
    speed: string;
    speed24h: string;
    localspeed24h: string;
    scale?: string;
    localspeed: string;
}

export default defineComponent({
    name: "PaneCard",
    props: {
        data: Object as PropType<PaneDataProps>
    },
    setup(props) {
        const isSwitch = ref<boolean>(false);
        const pane = inject(ProvidePaneData)
        const paneData = computed<PaneDataProps>(() => props.data || pane.value);
        return {
            paneData,
            isSwitch,
            rate: computed<{ vcount: number | string, defercount: number | string, uncount: number | string }>(() => {
                const { speed24hcount, speed24hinvalidcount, speed24hstalecount } = paneData.value;
                const total = speed24hcount + speed24hinvalidcount + speed24hstalecount;
                return {
                    vcount: ((speed24hcount / total || 0) * 100).toFixed(2) || 0,
                    defercount: ((speed24hstalecount / total || 0) * 100).toFixed(2) || 0,
                    uncount: Math.round(speed24hinvalidcount / (speed24hcount + speed24hinvalidcount) * 10000) / 100 || 0
                }
            }),
            handleSwitch() {
                isSwitch.value = !isSwitch.value
            }
        }
    },
    render() {
        return (
            <NGrid xGap={16} yGap={16} cols={2} responsive="screen" itemResponsive={true}>
                <NGi span="2 l:1">
                    <NCard title={this.$t("title.computational")} class="h-full">
                        <NGrid cols={3} xGap={20} yGap={20} responsive="screen" itemResponsive={true}>
                            <NGi span="3 m:1">
                                <strong class="font-medium block text-2xl">{this.paneData?.speed}</strong>
                                <span class="mt-2 text-base">{this.$t("statistic.effective")}</span>
                            </NGi>
                            <NGi span="3 m:1">
                                <strong class="font-medium  block text-2xl">{this.paneData?.speed24h}</strong>
                                <NSpace align="center">
                                    <span class="mt-2 text-base">{this.$t("statistic.avgeffective")}</span>
                                    {
                                        this.paneData?.scale &&
                                        (
                                            <NPopover placement="top" trigger="hover" v-slots={{ trigger: () => <NTag size="small" type="success">{this.paneData?.scale}</NTag> }}>
                                                <pre class="text-sm">{this.$t("tip.avgeffective")}</pre>
                                            </NPopover>
                                        )
                                    }
                                </NSpace>
                            </NGi>
                            <NGi span="3 m:1">
                                <strong class="font-medium block text-2xl">{this.isSwitch ? (this.paneData?.localspeed24h) : (this.paneData?.localspeed)}</strong>
                                <div><span class="mt-2 text-base">{this.isSwitch ? this.$t("statistic.avgReported") : this.$t("statistic.reported")}</span>
                                    <NPopover trigger="hover">
                                        {{
                                            trigger: () => <NButton class="align-middle ml-1" onClick={this.handleSwitch} text v-slots={{ icon: () => <NIcon component={RepeatSharp}></NIcon> }}></NButton>,
                                            default: () => <span>{this.isSwitch ? this.$t("statistic.reported") : this.$t("statistic.avgReported")} </span>
                                        }}
                                    </NPopover>
                                </div>
                            </NGi>
                        </NGrid>
                    </NCard>
                </NGi>
                <NGi span="2 l:1">
                    <NCard title={this.$t("title.totalShares")} class="h-full">
                        <NGrid cols={3} xGap={20} yGap={20} responsive="screen" itemResponsive={true}>
                            <NGi span="3 m:1">
                                <strong class="font-medium block text-2xl">{this.paneData?.speed24hcount}</strong>
                                <span class="mt-2 text-base">{this.$t("statistic.valid")} ({this.rate.vcount}%)</span>
                            </NGi>
                            <NGi span="3 m:1">
                                <strong class="font-medium block text-2xl">{this.paneData?.speed24hstalecount}</strong>
                                <span class="mt-2 text-base">{this.$t("statistic.stale")} ({this.rate.defercount}%)</span>
                            </NGi>
                            <NGi span="3 m:1">
                                <strong class="font-medium block text-2xl">{this.paneData?.speed24hinvalidcount}</strong>
                                <span class="mt-2 text-base">{this.$t("statistic.invalid")} ({this.rate.uncount}%)</span>
                            </NGi>
                        </NGrid>
                    </NCard>
                </NGi>
            </NGrid>
        )
    }
})