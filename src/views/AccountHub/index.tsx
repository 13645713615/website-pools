/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 15:54:29
 * @LastEditTime: 2022-06-21 17:43:17
 */


import GroupButton from "@/components/GroupButton";
import { useLoadDemand } from "@/hooks";
import { NButton } from "naive-ui";
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import Account from "../Account";

const Earnings = defineAsyncComponent(() => import("../Earnings"))
const Hashrate = defineAsyncComponent(() => import("../Hashrate"))


type Pages = "hashrate" | "earnings" | "account"



export default defineComponent({
    name: "AccountHub",
    setup() {
        const { t } = useI18n();

        const name = ref<Pages>("account");

        const render = {
            Earnings: useLoadDemand(() => name.value === "earnings", () => <Earnings></Earnings>),
            Hashrate: useLoadDemand(() => name.value === "hashrate", () => <Hashrate></Hashrate>)
        }

        const handle = {
            onSelect: (value: string) => {
                name.value = value as Pages
            }
        }

        return function () {
            return (
                <div class="min-h-ctx relative pt-[40px]">
                    <GroupButton class="flex gap-x-3 absolute top-0" value="account" onSelect={handle.onSelect}>
                        <NButton key="account" class="w-20" ghost>{t("button.account")}</NButton>
                        <NButton key="hashrate" class="w-20" ghost>{t("button.hashrate")}</NButton>
                        <NButton key="earnings" class="w-20" ghost>{t("button.earnings")}</NButton>
                    </GroupButton>
                    <div>
                        <div class={name.value == "account" ? "block" : "hidden"}><Account></Account></div>
                        <div class={name.value == "hashrate" ? "block" : "hidden"}>{render.Hashrate.value}</div>
                        <div class={name.value == "earnings" ? "block" : "hidden"}>{render.Earnings.value}</div>
                    </div>
                </div>
            )
        }
    }
})