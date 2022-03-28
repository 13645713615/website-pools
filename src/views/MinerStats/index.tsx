/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 14:26:46
 * @LastEditTime: 2022-03-27 12:43:26
 */

import Container from "@/layout/Container";
import { ProvideScrollTo } from "@/layout/Main/provide";
import { formatHashrate } from "@/utils/tools";
import { TrailSignOutline } from "@vicons/ionicons5";
import { NButton, NIcon, NSpace } from "naive-ui";
import CollapseTransition from "naive-ui/lib/collapse-transition/src/CollapseTransition";
import { computed, defineComponent, inject, onMounted, provide, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Hashcharts from "./layout/Hashcharts";
import PaneCard, { PaneDataProps } from "./layout/PaneCard";
import Sharescharts from "./layout/Sharescharts";
import Table from "./layout/Table";
import { Columns } from "./layout/Table/option";
import { ProvideWorker } from "./provide";

export default defineComponent({
    name: "MinerStats",
    setup() {
        const workerBarRefs = ref(null);
        const route = useRoute();
        const scrollTo = inject(ProvideScrollTo);
        const worker = computed<string>(() => route.query?.worker as string);
        const workerData = ref<PaneDataProps>(null);
        function handleClickWorker(rowData: Columns) {
            scrollTo({ top: workerBarRefs.value?.offsetTop || 0 })
            workerData.value = {
                ...rowData,
                speed: formatHashrate(rowData.speed),
                speed24h: formatHashrate(rowData.speed),
                localspeed: formatHashrate(rowData.speed)
            };
        }
        provide(ProvideWorker, worker)
        return function () {
            return (
                <Container>
                    <a ref={(refs) => workerBarRefs.value = refs} class="h-0 w-0"></a>
                    <NSpace vertical size={16}>
                        <CollapseTransition show={Boolean(worker.value)}>
                            <div class="bg-primary p-5 rounded-md flex items-center justify-between flex-row text-white" >
                                <div class="min-w-0">
                                    当前选择的矿机
                                    <h3 class="text-3xl my-1">{worker.value}</h3>
                                </div>
                                <RouterLink to={{ query: {} }}><NButton class="bg-white" onClick={() => workerData.value = null}><NIcon size={20} component={TrailSignOutline}></NIcon></NButton></RouterLink>
                            </div>
                        </CollapseTransition>
                        <PaneCard data={workerData.value}></PaneCard>
                        <Hashcharts></Hashcharts>
                        <Sharescharts></Sharescharts>
                        <Table onClick={handleClickWorker}></Table>
                    </NSpace>
                </Container>
            )
        }
    }
})