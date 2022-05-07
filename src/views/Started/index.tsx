/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 13:50:25
 * @LastEditTime: 2022-03-29 09:01:58
 */

import { useService } from "@/hooks";
import Container from "@/layout/Container";
import { getIndexPool } from "@/service/api";
import { useApp } from "@/store";
import { NAvatar, NButton, NGi, NGrid, NSkeleton, NTable } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import locale from "@/locale"

function GridNode(props: { coinPath, algo, coinType, coinUnit, baseRate, networkDifficulty, payLowest }): JSX.Element {
    const { t } = locale.global
    return (
        <NGi span="3 m:1">
            <div class="border rounded-md border-gray-200 border-solid bg-white">
                <div class="px-14 pb-8">
                    <div class="mb-8 ml-auto mr-auto mt-8 text-center">
                        <NAvatar round src={props.coinPath} size={48}></NAvatar>
                        <h3 class="leading-none">{props.algo}</h3>
                    </div>
                    <RouterLink to={{ name: "GPU", params: { coin: props.coinType } }}>
                        <NButton size="large" block class="shadow-md" type="primary">{t("button.gpu")}</NButton>
                    </RouterLink>
                </div>
                <NTable bordered={false}>
                    <tbody>
                        <tr><td>{t("table.scheme")}</td><td>PPS+ {t("tutorial.scheme")}</td> </tr>
                        <tr><td>{t("table.fee")}</td> <td>{props.baseRate}%</td> </tr>
                        <tr><td>{t("table.bonuses")}</td> <td>{t("tutorial.bonuses")}</td> </tr>
                        <tr><td>{t("table.payout")}</td> <td>{t("tutorial.payout")}</td> </tr>
                        <tr><td>{t("table.payouts")}</td> <td>{t("tutorial.payouts", { coin: props.coinUnit, lowest: props.payLowest })}</td> </tr>
                        <tr><td>{t("table.share")}</td> <td>{props.networkDifficulty}</td> </tr>
                        <tr><td>{t("table.algorithm")}</td> <td>{props.algo}</td> </tr>
                    </tbody>
                </NTable>
            </div>
        </NGi>
    )
}

export default defineComponent({
    name: "Started",
    setup() {
        const { getCoinPictures } = storeToRefs(useApp());
        const poolService = useService(getIndexPool, { immediate: true, defaultValue: [] });
        const GridNodes = computed(() => poolService.data.map((data) => GridNode({ ...data, coinPath: getCoinPictures.value.get(data.coinUnit) })))
        return {
            poolService,
            getCoinPictures,
            GridNodes
        }
    },
    render() {
        return (
            <div class="pt-12 pb-16 min-h-so-8">
                <Container>
                    <h3 class="text-2xl">{this.$t("title.started")}</h3>
                    <NGrid cols={3} xGap={60} yGap={20} responsive="screen" itemResponsive={true}>
                        {this.poolService.loading ?
                            <NGi span="3 m:1">
                                <div class="border rounded-md border-gray-200 border-solid bg-white">
                                    <div class="px-14 pb-8">
                                        <div class="mb-8 ml-auto mr-auto mt-8 text-center">
                                            <NSkeleton height="48px" width="48px" class="m-auto" circle />
                                            <NSkeleton text width="33%" class="mt-4" />
                                        </div>
                                        <NSkeleton size="large" />
                                    </div>
                                    <div class="mx-4">
                                        <NSkeleton height={22} class="my-3" repeat={5} text />
                                    </div>
                                </div>
                            </NGi>
                            : this.GridNodes
                        }
                    </NGrid>
                </Container>
            </div>
        )
    }
})