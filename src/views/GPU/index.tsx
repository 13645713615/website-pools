/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-16 09:23:30
 * @LastEditTime: 2022-09-15 12:06:47
 */

import Container from "@/layout/Container"
import { NCard, NFormItem, NInput, NList, NListItem, NSkeleton, NSpace } from "naive-ui"
import { Component, defineComponent, ref, renderSlot, watch } from "vue"
import { useI18n } from "vue-i18n"
import { RouteParams, useRoute } from "vue-router"


export interface Descriptions {
    loading?: boolean,
    title: string,
    section: {
        [x: string]: Component
    },
    node: Component[],
    software: Component[]
}


export default defineComponent({
    name: "GPU",
    setup() {
        const { t } = useI18n()
        const route = useRoute();
        const descriptions = ref<Descriptions>({ title: "", node: [], section: {}, software: [] })

        async function getDescriptions(params: RouteParams): Promise<Descriptions> {
            let modules;
            switch (params.coin) {
                case "eth":
                    modules = await import("./eth")
                    return new modules!.default(t);
                case "etc":
                    modules = await import("./etc")
                    return new modules!.default(t);
                case "ethw":
                    modules = await import("./ethw")
                    return new modules!.default(t);
                default:
                    throw new Error(route.params.coin + " file does not exist")
            }
        }

        watch(route.params, () => {
            getDescriptions(route.params).then((res) => {
                descriptions.value = res
            })
        }, { immediate: true })

        return {
            descriptions
        }
    },
    render() {
        return (
            <div class="pb-16 lg:pb-12 md:pt-10 pt-2">
                <Container>
                    <h2 class="text-2xl">{this.descriptions.title}</h2>
                    <NSpace size={[0, 24]} item-style={{ width: "100%" }}>
                        <NCard hoverable >
                            <section>
                                <h3 class="text-xl mt-0">
                                    <em class="mr-2 text-primary">#1</em>{this.$t("title.wallet")}
                                </h3>
                                <p class="text-base">
                                    {this.descriptions.section?.p1}<br />
                                    {this.descriptions.section?.p2}
                                </p>
                            </section>
                            <NFormItem label={this.$t("title.wallet")}>
                                <NInput class="max-w-lg" placeholder="0xBf48F613ccE223c94e0e889a0B660bD819D23478" readonly />
                            </NFormItem>
                        </NCard>
                        <NCard hoverable>
                            <section>
                                <h3 class="text-xl  mt-0">
                                    <em class="mr-2 text-primary">#2</em>{this.$t("title.server")}
                                </h3>
                            </section>
                            <NSpace vertical size={[0, 10]}>
                                {
                                    this.descriptions.loading ? (
                                        <>
                                            <NSkeleton height="25px" width="33%"></NSkeleton>
                                            <NSkeleton height="25px" width="33%"></NSkeleton>
                                        </>
                                    ) : this.descriptions.node
                                }
                            </NSpace>
                        </NCard>
                        <NCard hoverable>
                            <section>
                                <h3 class="text-xl  mt-0">
                                    <em class="mr-2 text-primary">#3</em>{this.$t("title.minerName")}
                                </h3>
                                <p class="text-base">
                                    {this.$t("tutorial.minerName")}
                                </p>
                            </section>
                            <NFormItem label={this.$t("title.minerName")}>
                                <NInput class="max-w-lg" placeholder="例如：矿机RX580x2" readonly />
                            </NFormItem>
                        </NCard>
                        <NCard hoverable>
                            <section>
                                <h3 class="text-xl  mt-0">
                                    <em class="mr-2 text-primary">#4</em>{this.$t("title.software")}
                                </h3>
                            </section>
                            <NList>
                                {this.descriptions.software?.map((software) => <NListItem>{software}</NListItem>)}
                            </NList>
                        </NCard>
                    </NSpace>
                </Container>
            </div>
        )
    }
})