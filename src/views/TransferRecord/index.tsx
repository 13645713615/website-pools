/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 14:26:46
 * @LastEditTime: 2022-04-28 15:38:14
 */

import Container from "@/layout/Container";
import { NSpace } from "naive-ui";
import { defineAsyncComponent, defineComponent, PropType } from "vue";
import PaneCard from "./layout/PaneCard";

export type Module = "EarningCharts" | "SettlementChart" | "SettlementTable"

const EarningCharts = defineAsyncComponent(() => import("./layout/EarningCharts"))
const SettlementChart = defineAsyncComponent(() => import("./layout/SettlementChart"))
const SettlementTable= defineAsyncComponent(() => import("./layout/Table"))

export default defineComponent({
    name: "TransferRecord",
    props: {
        module: {
            type: Array as PropType<Module[]>,
            default: () => ["EarningCharts", "SettlementChart","SettlementTable"]
        }
    },
    render(props) {
        return (
            <Container class="px-0 md:px-4">
                <NSpace vertical size={16}>
                    <PaneCard></PaneCard>
                    {
                        props.module.includes("EarningCharts") && <EarningCharts></EarningCharts>
                    }
                    {
                        props.module.includes("SettlementChart") && <SettlementChart></SettlementChart>
                    }
                    {
                        props.module.includes("SettlementTable") && <SettlementTable></SettlementTable>
                    }
                </NSpace>
            </Container>
        )
    }
})