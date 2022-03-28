/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 13:50:25
 * @LastEditTime: 2022-03-28 11:23:21
 */

import Container from "@/layout/Container";
import { useApp } from "@/store";
import { NAvatar, NButton, NGi, NGrid, NTable } from "naive-ui";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
    name: "Started",
    setup() {
        const { getCoinPictures } = storeToRefs(useApp());
        return {
            getCoinPictures
        }
    },
    render() {
        return (
            <div class="pt-12 pb-16 min-h-so-8">
                <Container>
                    <h3 class="text-2xl">{this.$t("title.started")}</h3>
                    <NGrid cols={3} xGap={60} yGap={20} responsive="screen" itemResponsive={true}>
                        <NGi span="3 m:1">
                            <div class="border rounded-md border-gray-200 border-solid bg-white">
                                <div class="px-14 pb-8">
                                    <div class="mb-8 ml-auto mr-auto mt-8 text-center">
                                        <NAvatar round src={this.getCoinPictures.get("ETH")} size={48}></NAvatar>
                                        <h3 class="leading-none">Ethereum</h3>
                                    </div>
                                    <RouterLink to={{ name: "GPU", params: { coin: "eth" } }}>
                                        <NButton size="large" block class="shadow-md" type="primary">{this.$t("button.gpu")}</NButton>
                                    </RouterLink>
                                </div>
                                <NTable bordered={false}>
                                    <tbody>
                                        <tr><td>{this.$t("table.scheme")}</td><td>PPS+ {this.$t("tutorial.scheme")}</td> </tr>
                                        <tr><td>{this.$t("table.fee")}</td> <td>1%</td> </tr>
                                        <tr><td>{this.$t("table.bonuses")}</td> <td>{this.$t("tutorial.bonuses")}</td> </tr>
                                        <tr><td>{this.$t("table.payout")}</td> <td>{this.$t("tutorial.payout")}</td> </tr>
                                        {/* <tr><td>{this.$t("table.payouts")}</td> <td>{this.$t("tutorial.payouts",{coin:"ETH"})}</td> </tr> */}
                                        {/* <tr><td>{this.$t("table.block")}</td> <td>120 {this.$t("tutorial.block")}</td> </tr> */}
                                        {/* <tr><td>{this.$t("table.share")}</td> <td>4 GH</td> </tr> */}
                                        <tr><td>{this.$t("table.algorithm")}</td> <td>Ethash</td> </tr>
                                    </tbody>
                                </NTable>
                            </div>
                        </NGi>
                        {/* <NGi span="3 m:1">
                            <div class="border rounded-md border-gray-200 border-solid bg-white">
                                <div class="px-14 pb-8">
                                    <div class="mb-8 ml-auto mr-auto mt-8 text-center">
                                        <NAvatar round src={this.getCoinPictures.get("ETC")} size={48}></NAvatar>
                                        <h3 class="leading-none">Ethereum Classic</h3>
                                    </div>
                                    <RouterLink to={{ name: "GPU", params: { coin: "etc" } }}>
                                        <NButton size="large" block class="shadow-md" type="primary">{this.$t("button.gpu")}</NButton>
                                    </RouterLink>
                                </div>
                                <NTable bordered={false}>
                                    <tbody>
                                        <tr><td>{this.$t("table.scheme")}</td> <td>PPS+ {this.$t("tutorial.scheme")}</td> </tr>
                                        <tr><td>{this.$t("table.fee")}</td> <td>1%</td> </tr>
                                        <tr><td>{this.$t("table.payout")}</td> <td>{this.$t("tutorial.payout")}</td> </tr>
                                        <tr><td>{this.$t("table.payouts")}</td> <td>{this.$t("tutorial.payouts", { coin: "ETC" })}</td> </tr>
                                        <tr><td>{this.$t("table.block")}</td> <td>120 {this.$t("tutorial.block")}</td> </tr>
                                        <tr><td>{this.$t("table.share")}</td> <td>4 GH</td> </tr>
                                        <tr><td>{this.$t("table.algorithm")}</td> <td>Ethash</td> </tr>
                                    </tbody>
                                </NTable>
                            </div>
                        </NGi> */}
                    </NGrid>
                </Container>
            </div>
        )
    }
})