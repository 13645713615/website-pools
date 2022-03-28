/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 17:37:26
 * @LastEditTime: 2022-03-04 13:42:00
 */

import Container from "@/layout/Container";
import { NGi, NGrid, NImage } from "naive-ui";
import { defineComponent } from "vue";
import horseride from "@assets/images/horseride.svg"
import moon from "@assets/images/moon.svg"

export default defineComponent({
    name: "Characteristic",
    render() {
        return (
            <div class="w-full bg-white">
                <Container class="text-center pt-12 pb-11">
                    <b class="block text-2xl font-semibold">{this.$t("title.characteristic")}</b>
                    <NGrid yGap={30} cols={4} responsive="screen" class="mt-7" itemResponsive={true}>
                        <NGi span="4 m:2">
                            <div>
                                <NImage src={moon} width={242} height={150}></NImage>
                                <h3>{this.$t("slogan.faster")}</h3>
                                <span>{this.$t("slogan.specialPurpose")}</span>
                            </div>
                        </NGi>
                        <NGi span="4 m:2">
                            <div>
                                <NImage src={horseride} width={242} height={150}></NImage>
                                <h3>{this.$t("slogan.service")}</h3>
                                <span>{this.$t("slogan.team")}</span>
                            </div>
                        </NGi>
                    </NGrid>
                </Container>
            </div>
        )
    }
})