/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 14:26:46
 * @LastEditTime: 2022-03-12 11:48:23
 */

import Container from "@/layout/Container";
import { NSpace } from "naive-ui";
import { defineComponent } from "vue";
import EarningCharts from "./layout/EarningCharts";
import PaneCard from "./layout/PaneCard";
import SettlementChart from "./layout/SettlementChart";


export default defineComponent({
    name: "TransferRecord",
    render() {
        return (
            <Container>
                <NSpace vertical size={16}>
                    <PaneCard></PaneCard>
                    <EarningCharts></EarningCharts>
                    <SettlementChart></SettlementChart>
                </NSpace>
            </Container>
        )
    }
})