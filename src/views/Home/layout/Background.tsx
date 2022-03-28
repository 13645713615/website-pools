/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-02 18:23:20
 * @LastEditTime: 2022-03-27 13:09:08
 */

import Container from "@/layout/Container";
import { defineComponent, renderSlot, } from "vue";
import bg2_600 from "@/assets/images/bg2/bg2-600.png"
import bg2_900 from "@/assets/images/bg2/bg2-900.png"
import bg2_1500 from "@/assets/images/bg2/bg2-1500.png"
import bg2 from "@/assets/images/bg2/bg2.png"
import { RouterLink } from "vue-router";
import Screen from "@components/Screen"

export default defineComponent({
    name: "Background",
    render() {
        return (
            <div class="w-ful text-white pt-16 relative md:h-[543px] h-[400px]">
                <div class="absolute top-0 left-0 right-0 flex justify-center -z-10 overflow-hidden h-full">
                    <img class="min-h-full min-w-full" src={bg2} srcset={`${bg2_600} 600w,${bg2_900} 900w,${bg2_1500} 2000w, ${bg2} 3000w`} ></img>
                </div>
                <Container class="text-center ">
                    <h1 class="text-3xl leading-none">{this.$t("slogan.future")}</h1>
                    <p class="text-base leading-none">{this.$t("slogan.innovate")}</p>
                    <div class="relative">
                        <div class="mt-8  absolute w-full z-10">{renderSlot(this.$slots, "default")}</div>
                    </div>
                    <Screen size="large">
                        <RouterLink to={{ name: "started" }} class="circular large float-left mt-8 " >{this.$t("header.started")}</RouterLink>
                    </Screen>
                </Container>
                <Screen size="large">
                    <Container class="absolute bottom-0 text-right left-0 right-0">
                        <RouterLink to={{ name: "statistics" }} class="circular small mr-10">{this.$t("header.statistics")}</RouterLink>
                        <RouterLink to={{ name: "blocks" }} class="circular small mr-10" >{this.$t("header.blocks")}</RouterLink>
                        <RouterLink to={{ name: "miners" }} class="circular small ">{this.$t("header.miners")}</RouterLink>
                    </Container>
                </Screen>

            </div>
        )
    }
})