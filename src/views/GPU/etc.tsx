/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-16 14:18:08
 * @LastEditTime: 2022-03-27 15:27:54
 */

import { CloudDownload } from "@vicons/ionicons5";
import { NSpace, NTag, NImage, NButton, NIcon } from "naive-ui";
import { Descriptions } from ".";
import linux from "@/assets/images/linux.png"
import windows from "@/assets/images/windows.png"
import hiveos from "@/assets/images/hiveos.png"
import { getIndexPoolInfo } from "@/service/api";
import { Component } from "vue";
import { IServiceData, useService } from "@/hooks";
import locale from "@/locale"


export default class EtcDescriptions implements Descriptions {

    public get loading() {
        return this.service.loading
    }

    public title = "Ethereum Classic mining";

    public get software() {
        return [
            <NSpace align="center" justify="space-between">
                <section>
                    <h4 class="text-lg my-1 ">TeamRedMiner<NTag type="error" class="ml-2">AMD</NTag></h4>
                    <span>{locale.global.t("tutorial.software.t1")}</span>
                    <p class="m-0">
                        <strong>{locale.global.t("tutorial.cost")}:</strong><span>0.75-1%</span>
                    </p>
                </section>
                <NSpace size={18} align="center" justify="end">
                    <NImage height={30} width={30} src={windows}></NImage>
                    <NImage height={30} width={30} src={linux}></NImage>
                    <NImage height={30} width={30} src={hiveos}></NImage>
                    <NButton tag="a" {...{ href: "https://github.com/todxx/teamredminer/releases", target: "_blank" }} type="primary"><NIcon size={18} component={CloudDownload} /></NButton>
                </NSpace>
            </NSpace>,
            <NSpace align="center" justify="space-between">
                <section>
                    <h4 class="text-lg my-1 ">T-Rex Miner<NTag type="success" class="ml-2">NVIDIA</NTag></h4>
                    <span>{locale.global.t("tutorial.software.t2")}</span>
                    <p class="m-0">
                        <strong>{locale.global.t("tutorial.cost")}:</strong><span>1%</span>
                    </p>
                </section>
                <NSpace size={18} align="center" justify="end">
                    <NImage height={30} width={30} src={windows}></NImage>
                    <NImage height={30} width={30} src={linux}></NImage>
                    <NImage height={30} width={30} src={hiveos}></NImage>
                    <NButton tag="a" {...{ href: "https://trex-miner.com/", target: "_blank" }} type="primary"><NIcon size={18} component={CloudDownload} /></NButton>
                </NSpace>
            </NSpace>,
            <NSpace align="center" justify="space-between">
                <section>
                    <h4 class="text-lg my-1 ">lolMiner<NTag type="success" class="ml-2">NVIDIA</NTag><NTag type="error" class="ml-2">AMD</NTag></h4>
                    <span>{locale.global.t("tutorial.software.t3")}</span>
                    <p class="m-0">
                        <strong>{locale.global.t("tutorial.cost")}:</strong><span>0.75%</span>
                    </p>
                </section>
                <NSpace size={18} align="center" justify="end">
                    <NImage height={30} width={30} src={windows}></NImage>
                    <NImage height={30} width={30} src={linux}></NImage>
                    <NImage height={30} width={30} src={hiveos}></NImage>
                    <NButton tag="a" {...{ href: "https://github.com/Lolliedieb/lolMiner-releases/releases", target: "_blank" }} type="primary"><NIcon size={18} component={CloudDownload} /></NButton>
                </NSpace>
            </NSpace>,
            <NSpace align="center" justify="space-between">
                <section>
                    <h4 class="text-lg my-1 ">PhoenixMiner<NTag type="success" class="ml-2">NVIDIA</NTag><NTag type="error" class="ml-2">AMD</NTag></h4>
                    <span>{locale.global.t("tutorial.software.t4")}</span>
                    <p class="m-0">
                        <strong>{locale.global.t("tutorial.cost")}:</strong><span>0.65%</span>
                    </p>
                </section>
                <NSpace size={18} align="center" justify="end">
                    <NImage height={30} width={30} src={windows}></NImage>
                    <NImage height={30} width={30} src={linux}></NImage>
                    <NImage height={30} width={30} src={hiveos}></NImage>
                    <NButton tag="a" {...{ href: "https://phoenixminer.info/downloads/", target: "_blank" }} type="primary"><NIcon size={18} component={CloudDownload} /></NButton>
                </NSpace>
            </NSpace>,
            <NSpace align="center" justify="space-between">
                <section>
                    <h4 class="text-lg my-1 ">GMiner<NTag type="success" class="ml-2">NVIDIA</NTag><NTag type="error" class="ml-2">AMD</NTag></h4>
                    <span>{locale.global.t("tutorial.software.t5")}</span>
                    <p class="m-0">
                        <strong>{locale.global.t("tutorial.cost")}:</strong><span>0.65%</span>
                    </p>
                </section>
                <NSpace size={18} align="center" justify="end">
                    <NImage height={30} width={30} src={windows}></NImage>
                    <NImage height={30} width={30} src={linux}></NImage>
                    <NImage height={30} width={30} src={hiveos}></NImage>
                    <NButton tag="a" {...{ href: "https://github.com/develsoftware/GMinerRelease/releases", target: "_blank" }} type="primary"><NIcon size={18} component={CloudDownload} /></NButton>
                </NSpace>
            </NSpace>
        ]
    }


    public get section() {
        return {
            p1: (<>{locale.global.t("tutorial.wallet.t1")} <a href="https://www.binance.com/en/register?ref=B2675KF5" target="_blank">binance </a> 、<a href="https://www.coinbase.com" target="_blank">Coinbase</a>。</>),
            p2: (<>{locale.global.t("tutorial.wallet.t2")} <b>{locale.global.t("tutorial.wallet.t3")}</b>，{locale.global.t("tutorial.wallet.t4")}
                <a href="https://www.ledger.com/" target="_blank" >Ledger</a> {locale.global.t("tutorial.wallet.t5")}
                <a href="https://trezor.io/" target="_blank">Trezor</a> 。</>)
        }
    }

    private service: IServiceData<{ node: string }>;

    constructor() {
        this.service = useService<{ node: string }>(getIndexPoolInfo, { params: "etc", defaultValue: { node: "" }, immediate: true });
    }

    public get node() {
        return this.service.data?.node.split(",").map<Component>((node) => <span>{node}</span>)
    }
}
