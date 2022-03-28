/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 13:50:25
 * @LastEditTime: 2022-03-27 17:52:26
 */

import CoinSwitch from "@/components/CoinSwitch";
import Subscriber from "@/layout/Subscriber";
import { NSpace, NCard } from "naive-ui";
import { defineComponent } from "vue";
import Table from "./layout/Table";


export default defineComponent({
    name: "Miners",
    render() {
        return (
            <Subscriber class="min-h-so-8">
                <NSpace align="center">
                    <h3 class="text-white text-2xl">{this.$t("title.miner")}</h3> <CoinSwitch size="large" />
                </NSpace>
                <NCard>
                    <Table></Table>
                </NCard>
            </Subscriber>
        )
    }
})