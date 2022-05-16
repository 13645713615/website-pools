/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 13:49:37
 * @LastEditTime: 2022-05-16 09:45:47
 */

import { ProvidePaneData } from "@/views/Miner/provide";
import { NGrid, NGi, NCard, NSpace, NPopover, NTag } from "naive-ui";
import { defineComponent, inject, computed, PropType } from "vue";

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
        const pane = inject(ProvidePaneData)
        const paneData = computed<PaneDataProps>(() => props.data || pane.value);
        return {
            paneData,
            rate: computed<{ vcount: number | string, defercount: number | string, uncount: number | string }>(() => {
                const { speed24hcount, speed24hinvalidcount, speed24hstalecount } = paneData.value;
                const total = speed24hcount + speed24hinvalidcount + speed24hstalecount;
                return {
                    vcount: ((speed24hcount / total || 0) * 100).toFixed(2) || 0,
                    defercount: ((speed24hstalecount / total || 0) * 100).toFixed(2) || 0,
                    uncount: Math.round(speed24hinvalidcount / (speed24hcount + speed24hinvalidcount) * 10000) / 100 || 0
                }
            })
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
                                <strong class="font-medium block text-2xl">{this.paneData?.localspeed}</strong>
                                <span class="mt-2 text-base">{this.$t("statistic.reported")}</span>
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