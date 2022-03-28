/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-02 21:51:04
 * @LastEditTime: 2022-03-16 15:44:28
 */

import { useExchange } from "@/hooks";
import { useApp } from "@/store";
import { mul } from "@/utils/tools";
import { AddCircleOutline, AlertCircleOutline } from "@vicons/ionicons5";
import { NAvatar, NButton, NCard, NIcon, NSpace, NTooltip } from "naive-ui";
import { computed, defineComponent, PropType, toRefs } from "vue";
import { RouterLink } from "vue-router";

const scope = 0.1

interface CardPropData {
    hashrateprice: number;
    price: number;
    coinUnit: string;
    baseRate: number;
    defaultMethod: string,
    coinType:string
}

export default defineComponent({
    name: "Card",
    props: {
        data: Object as PropType<CardPropData>
    },
    setup(props) {
        const appStore = useApp()
        const exchange = useExchange();
        const { hashrateprice, price, coinUnit, defaultMethod, baseRate, coinType } = toRefs<CardPropData>(props.data)
        return {
            hashrateprice,
            price,
            coinUnit,
            coinType,
            baseRate,
            defaultMethod,
            exchange,
            coinPicture: computed(() => appStore.getCoinPictures.get(props.data.coinUnit))
        }
    },
    computed: {
        earnings(): number {
            return Number(mul(this.hashrateprice, this.price).toFixed(6))
        },
        dayCoinEarnings(): [number, string] {
            return [this.exchange(mul(this.earnings, scope)).value, mul(this.hashrateprice, scope).toFixed(6)]
        },
        monthCoinEarnings(): [number, string] {
            return [this.exchange(mul(this.earnings, scope * 30)).value, mul(this.hashrateprice, scope * 30).toFixed(6)]
        },
    },
    render() {
        return (
            <NCard class="shadow">
                <div class="relative">
                    <NAvatar class="absolute" src={this.coinPicture} round size={60} />
                    <NSpace class="pl-20" vertical>
                        <div>
                            <strong class="font-extrabold block text-2xl">{this.coinUnit}</strong>
                            <span class="text-gray-500">{this.$t("profit.estimated")} <NTooltip v-slots={{ trigger: () => <NIcon class="align-middle" size={16} component={AlertCircleOutline} /> }}>预计收益按过往七天矿池收入计算。</NTooltip> </span>
                        </div>
                        <div class="pt-4">
                            <span>100MH/s{this.$t("profit.daily")}</span>
                            <p class="m-0 mt-2">
                                <b class="font-medium text-xl">{this.$n(this.dayCoinEarnings[0] || 0, "currency")}</b>
                                <span class="text-gray-500">≈{this.dayCoinEarnings[1] || "--"} {this.coinUnit}</span>
                            </p>
                        </div>
                        <div class="pt-4">
                            <span>100MH/s{this.$t("profit.monthly")}</span>
                            <p class="m-0 mt-2">
                                <b class="font-medium text-xl">{this.$n(this.monthCoinEarnings[0] || 0, "currency")}</b>
                                <span class="text-gray-500">≈{this.monthCoinEarnings[1] || "--"} {this.coinUnit}</span>
                            </p>
                        </div>

                        <div class="pt-3 flex justify-between items-center ">
                            <span class="text-gray-500">{this.$t("profit.rate")} {this.baseRate || 0}% ({this.defaultMethod || "--"})  <NTooltip v-slots={{ trigger: () => <NIcon class="align-middle" size={16} component={AddCircleOutline} /> }}>额外加成 MEV（矿工可提取价值）+ 90% 收入</NTooltip> </span>
                            <RouterLink to={{ name: "GPU", params: { coin: this.coinType } }}>
                                <NButton type="success">{this.$t("button.started")}</NButton>
                            </RouterLink>
                        </div>
                    </NSpace>
                </div>
            </NCard>
        )
    }
})
