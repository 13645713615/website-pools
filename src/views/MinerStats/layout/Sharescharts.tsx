/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 13:37:13
 * @LastEditTime: 2022-03-27 11:09:24
 */

import Charts, { PropsOption } from "@/components/Charts";
import columnar from "@/components/Charts/type/columnar";
import { useService } from "@/hooks";
import { getUserSharesDay, getWorkersharesDay } from "@/service/api";
import { ProvideLoad, ProvideWalletInfo } from "@/views/Miner/provide";
import { NCard } from "naive-ui";
import { defineComponent, inject, onMounted, ref, shallowReactive, watch } from "vue";
import { useI18n } from "vue-i18n"
import { ProvideWorker } from "../provide";


export default defineComponent({
    name: "Sharescharts",
    setup() {
        const date = ref<Number>(1);
        const { t } = useI18n();
        const onload = inject(ProvideLoad);
        const walletInfo = inject(ProvideWalletInfo);
        const worker = inject(ProvideWorker);
        async function getSharesDay(params: Record<string, any>) {
            return await worker.value ? getWorkersharesDay.apply(null, [{ ...params, workerName: worker.value }]) : getUserSharesDay.apply(null, [params])
        }
        const UserShareschartsData = shallowReactive<PropsOption>({ xData: [], yData: [], legend: [t("title.valid"), t("title.stale"), t("title.invalid")] });
        const UserSharesService = useService<string[][]>(getSharesDay, {
            defaultValue: [[], [], [], []],
            params() {
                const { coin, wallet: accountName, token } = walletInfo.value;
                return { coin, accountName, token, day: date.value }
            },
        }, (data) => { [UserShareschartsData.xData, ...UserShareschartsData.yData] = data });
      
        onMounted(() => {
            onload().subscribe(() => UserSharesService.run())
            watch(worker, () => UserSharesService.run(), { immediate: true });
        });

        return {
            UserShareschartsData
        }
    },
    render() {
        return (
            <NCard>
                <h2 class="text-center">{this.$t("title.shares")}</h2>
                <Charts class="pt-4" color={["#0069FF", "#e21d26", "#ff9d4d"]} data={this.UserShareschartsData} construct={columnar} style={{ height: "300px" }} />
            </NCard>
        )
    }
})