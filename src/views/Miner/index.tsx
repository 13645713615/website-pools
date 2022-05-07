/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-09 22:12:11
 * @LastEditTime: 2022-05-05 15:13:58
 */

import Container from "@/layout/Container";
import { NButton, NCard, NGi, NGrid, NIcon, NPopover, NSpace, NTabPane, NTabs } from "naive-ui";
import { computed, defineAsyncComponent, defineComponent, onMounted, provide, ref, toRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import RefreshSwitch from "./layout/RefreshSwitch";
import { useEmiter, useLocation, userVisitoRender, useService } from "@/hooks";
import { getIndexPoolInfo, getPanelData } from "@/service/api";
import { BarChart, BarChartSharp, RefreshSharp, Wallet } from "@vicons/ionicons5";
import { ProvideLoad, ProvidePaneData, ProvideWalletInfo } from "./provide";
import { at, getTimeState } from "@/utils/tools";
import { useUser } from "@/store";
import module, { allModule, MinerModule, moduleValue } from "./module";
import { useI18n } from "vue-i18n";
import { Collect } from "@/views/Follow/layout/Create";

const Profit = defineAsyncComponent(() => import("@/views/Profit"));
const TransferRecord = defineAsyncComponent(() => import("@/views/TransferRecord"));
const WalletCoinBar = defineAsyncComponent(() => import("./layout/WalletCoinBar"));
const AccountCoinBar = defineAsyncComponent(() => import("@components/AccountCoinBar"));
const MinerStats = defineAsyncComponent(() => import("@/views/MinerStats"));

const defaultValue = {
    online: 0, offline: 0, blanace: "--", blanace_RMB: "--", ppsReward: "--", ppsReward_RMB: "--", speed: "--", speed24h: "--", scale: "0 %", localspeed: "--", localspeed24h: "--", speed24hcount: 0, speed24hinvalidcount: 0, speed24hstalecount: 0,
}

export default defineComponent({
    name: "Miner",
    setup() {
        const { t } = useI18n()
        const index = ref<number>(0);
        const emiter = useEmiter<"MinerEmiter">();
        const route = useRoute();
        const routeParams = computed<{ coin: string, wallet: string, token: string, type?: string }>(() => route.params as any);
        const isAccount = computed<boolean>(() => route.name === "state");
        const poolInfo = toRef(useService<Record<string, any>>(getIndexPoolInfo, { params: () => routeParams.value.coin, defaultValue: {}, immediate: true }), "data");
        const paneServeice = useService(getPanelData, {
            params: () => {
                const { coin, wallet: accountname, token } = routeParams.value;
                return { coin, accountname, token }
            },
            immediate: true,
            defaultValue,
        }, () => index.value++);

        const paneData = computed<Record<string, any>>(() => paneServeice.data)

        const TabPaneModules = computed<JSX.Element[]>(() => {
            let moduleType = allModule;
            if (routeParams.value.type) {
                moduleType = routeParams.value.type.split(",") as MinerModule[]
            }
            return [...moduleValue(module, moduleType)].map(([key, ...value]) => RenderTabPane(key, value, t))
        })

        provide(ProvidePaneData, paneData);
        provide(ProvideWalletInfo, routeParams);
        provide(ProvideLoad, emiter.on.bind(emiter, "MinerEmiter"));

        function loadData() {
            paneServeice.run(undefined, () => emiter.emit("MinerEmiter"))
        }

        onMounted(() => {
            if (isAccount.value) {
                const currentAccountCoin = toRef(useUser(), "currentAccountCoin")
                const router = useRouter()
                watch(currentAccountCoin, ([wallet, coin]) => {
                    router.replace({ params: { wallet, coin } }).then(() => loadData())
                }, { deep: true })
            }
        })

        return {
            TabPaneModules,
            routeParams,
            paneData,
            poolInfo,
            isAccount,
            itmeState: getTimeState(),
            coin: computed<string>(() => (routeParams.value.coin as string).toUpperCase()),
            wallet: computed<string>(() => routeParams.value.wallet as string),
            loadData
        }
    },
    render() {

        const [pageTypeName, pageUrl] = getTypeAndUrl()

        return (
            <div class="bg-white min-h-so-8">
                <Container>
                    <div class="pb-4 pt-8 flex items-center justify-between">
                        <span class="text-lg ">{this.$t("date." + this.itmeState)}, {this.$t("tip.digging", { miner: this.paneData.online, coin: this.poolInfo.en, hashrate: this.paneData.speed })}</span>
                        <RefreshSwitch onFinish={this.loadData} class="md:block hidden"></RefreshSwitch>
                    </div>
                    <NSpace vertical size={16}>
                        <NCard>
                            <div class="flex items-center">
                                {this.isAccount ? <AccountCoinBar class="flex-1 min-w-0 mr-3" /> : <WalletCoinBar class="flex-1 min-w-0 mr-3" />}
                                <div class="flex gap-2">
                                    <NPopover>
                                        {{
                                            trigger: () => <Collect coin={this.coin} url={pageUrl} wallet={this.wallet} pageName={pageTypeName} />,
                                            default: () => <span>收藏</span>
                                        }}
                                    </NPopover>
                                    <NPopover>
                                        {{
                                            trigger: () => <NButton size="large" onClick={this.loadData} class="p-0 w-10  md:inline-flex hidden h-10 text-center" v-slots={{ icon: () => <NIcon size={18} component={RefreshSharp} /> }} />,
                                            default: () => <span>刷新</span>
                                        }}
                                    </NPopover>
                                </div>
                            </div>
                        </NCard>
                        <NCard>
                            <NSpace class="text-lg" size={[32, 16]}>
                                <div>{this.$t("statistic.threshold")}: <span>{Number(this.poolInfo.confirmed) || "--"} <span class="text-primary">{this.coin}</span></span></div>
                                <div>{this.$t("statistic.rate")}: <span>{this.poolInfo.fee || "--"} %</span></div>
                                <div>{this.$t("statistic.settlement")}: {this.poolInfo.resultTime || "--"}</div>
                                <div>{this.$t("statistic.transfer")}: {this.poolInfo.transferTime || "--"}</div>
                                <div>{this.$t("statistic.price")}:  {this.$n(this.poolInfo.price || 0, "currency")}</div>
                            </NSpace>
                        </NCard>
                        <NGrid xGap={16} yGap={16} cols={8} responsive="screen" itemResponsive={true}>
                            <NGi span="4 m:2">
                                <NCard title={this.$t("statistic.minerStatus")} class="h-full">
                                    <span class="font-medium block text-2xl">{this.paneData.online}/<span class="text-gray-500">{this.paneData.offline}</span></span>
                                </NCard>
                            </NGi>
                            <NGi span="4 m:2">
                                <NCard title={this.$t("statistic.balance")}>
                                    <span class="font-medium block text-2xl">{this.paneData.blanace}</span>
                                    <span class="text-gray-500 text-lg">≈ {this.paneData.blanace_RMB}</span>
                                </NCard>
                            </NGi>
                            <NGi span="4 m:2">
                                <NCard title={this.$t("statistic.noPaid")} class="h-full">
                                    {
                                        this.paneData.status == 0 ? <>
                                            <span class="font-medium block text-2xl">{this.paneData.noPaid}</span>
                                            <span class="text-gray-500 text-lg">≈ {this.paneData.noPaid_RMB}</span>
                                        </> :
                                            <span class="font-medium block text-2xl">{this.$t("statistic.paymentpending")}</span>
                                    }
                                </NCard>
                            </NGi>
                            <NGi span="4 m:2">
                                <NCard title={this.$t("statistic.dugToday")}>
                                    <span class="font-medium block text-2xl">{this.paneData.ppsReward}</span>
                                    <span class="text-gray-500 text-lg">≈ {this.paneData.ppsReward_RMB}</span>
                                </NCard>
                            </NGi>
                        </NGrid>
                    </NSpace>
                </Container>
                <div class="w-full pt-8 ">
                    <NTabs size="large" class="tabs-container" type="line" paneClass="bg-gray-50 " paneStyle={{ minHeight: "20rem", padding: "2rem 0 3rem 0" }}>
                        {this.TabPaneModules}
                    </NTabs>
                </div>
            </div>
        )
    }
})


function RenderTabPane(key: string, value: any[], $t): JSX.Element {
    switch (key) {
        case "MinerStats":
            return (
                <NTabPane name="MinerStats" v-slots={{ tab: () => <><NIcon component={BarChart} /> <span class="ml-2">{$t("title.minerStatus")}</span></> }} displayDirective="if">
                    <MinerStats module={value}></MinerStats>
                </NTabPane>
            )
        case "Profit":
            return (
                <NTabPane name="Profit" v-slots={{ tab: () => <><NIcon component={Wallet} /> <span class="ml-2">{$t("title.payments")}</span></> }} displayDirective="if">
                    <Profit></Profit>
                </NTabPane>
            )
        case "TransferRecord":
            return (
                <NTabPane name="TransferRecord" v-slots={{ tab: () => <><NIcon component={BarChartSharp} /> <span class="ml-2">{$t("title.rewards")}</span></> }} displayDirective="if">
                    <TransferRecord module={value}></TransferRecord>
                </NTabPane>
            )
        default:
            break;
    }
}


function getTypeAndUrl(): [string, string] {
    const pathnames = useLocation() as string[];
    return [pathnames[0], at(pathnames, -1)]
}