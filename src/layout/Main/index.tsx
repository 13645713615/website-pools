/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 16:22:03
 * @LastEditTime: 2022-03-27 12:02:32
 */

import { LayoutInst, NAlert, NButton, NLayout } from "naive-ui";
import { Component, computed, defineAsyncComponent, defineComponent, onMounted, provide, ref, watch } from "vue";
import Content from "../Content";
import Footer from "../Footer";
import Header from "../Header";
import Screen from "@components/Screen"
import { useMenu, iconMenuOptions, useUserMenu } from "../Menu/option";
import { useI18n } from "vue-i18n";
import { RouterLink, useRoute } from "vue-router";
import { useApp } from "@/store";
import { userVisitoRender } from "@/hooks";
import UserMenu from "../Menu/UserMenu";
import { ProvideScrollTo } from "./provide";

const LocaleSelect = defineAsyncComponent(() => import("@/components/LocaleSelect"));
const ExpandetMenu = defineAsyncComponent(() => import("../Menu/Expandet"));
const ContractileMenu = defineAsyncComponent(() => import("../Menu/Contractile"));
const Drawer = defineAsyncComponent(() => import("../Drawer"));
const Accordion = defineAsyncComponent(() => import("../Menu/Accordion"));

export default defineComponent({
    name: "Main",
    setup() {
        const { getNotice, $patch } = useApp();
        const NoticeContext = ref<Component>(null);
        const route = useRoute();
        const layoutRefs = ref<LayoutInst>(null);
        const { menuLeftOptions } = useMenu();
        const { t } = useI18n()

        const MiningBtn = <RouterLink class="block" to="/started"><NButton class="w-full lg:w-auto" type="primary">{t("button.started")}</NButton></RouterLink>

        const pageName = computed<string>(() => route.name as string);

        const visitoRender = computed<Component>(() => userVisitoRender(
            <>
                <RouterLink class="block" to="/login"><NButton class="w-full lg:w-auto" type="primary" >{t("button.login")}/{t("button.register")} </NButton></RouterLink>
                {MiningBtn}
            </>
            ,
            <UserMenu />
        ))
        provide(ProvideScrollTo, function (option: ScrollToOptions) {
            layoutRefs?.value.scrollTo(option)
        });
        onMounted(() => {
            watch(() => route.name, () => layoutRefs.value?.scrollTo({ top: 0 }))
            getNotice().then((data) => {
                let consumption = [], context: Component[] = [];
                (data as Record<string, any>[]).forEach((item) => {
                    consumption.push(item.id);
                    context.push(<>{item.engname || item.name}{item.engpath || item.path} <br /></>)
                })
                NoticeContext.value = context;
                $patch((state) => Array.prototype.push.apply(state.notices, consumption))
            }).catch(() => { })
        })

        function BigScreenTemplate() {
            return (
                <ExpandetMenu name={pageName.value} left={menuLeftOptions} >
                    <LocaleSelect class=" w-28 text-center" />{visitoRender.value}
                </ExpandetMenu>
            )
        }

        function smallScreenTemplate() {
            return (
                <>
                    <ContractileMenu options={iconMenuOptions} />
                    <Drawer>
                        <Accordion name={pageName.value} options={[].concat(menuLeftOptions, useUserMenu())}>
                            {MiningBtn}
                        </Accordion>
                    </Drawer>
                </>
            )
        }

        return {
            layoutRefs,
            NoticeContext,
            handleAlertClose() {
                NoticeContext.value = null;
            },
            ScreenSlotsTemplate: {
                default: BigScreenTemplate,
                other: smallScreenTemplate
            }
        }
    },
    render() {
        return (
            <NLayout class="h-screen" ref={(ref) => this.layoutRefs = ref}>
                <Header class="sticky top-0 z-50">
                    <Screen size="large" v-slots={this.ScreenSlotsTemplate}></Screen>
                </Header>
                {
                    this.NoticeContext && <NAlert class="global-alert sticky top-16 z-40" showIcon={false} onAfterLeave={this.handleAlertClose} closable={true}>
                        <div class="text-center text-white">
                            {this.NoticeContext}
                        </div>
                    </NAlert>
                }
                <Content {...{ id: "content" }}></Content>
                <Footer></Footer>
            </NLayout>
        )
    }
})