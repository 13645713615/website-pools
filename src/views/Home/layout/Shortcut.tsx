/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:27:26
 * @LastEditTime: 2022-03-13 18:32:22
 */

import { NGrid, NGi } from "naive-ui";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
    name: "Shortcut",
    render() {
        return (
            <NGrid cols={3} responsive="screen" itemResponsive={true}>
                <NGi span="3 m:1">
                    <RouterLink to="/" class="card-link">
                        <div>
                            <span class=" text-gray-800 text-xs">{this.$t("shortcut.join")}</span>
                            <b class="block text-xl font-medium mt-4">{this.$t("shortcut.configuration")}</b>
                        </div>
                        <div class="mt-2 text-primary">{this.$t("shortcut.started")}</div>
                    </RouterLink>
                </NGi>
                <NGi span="3 m:1">
                    <RouterLink to="/" class="card-link">
                        <div>
                            <span class=" text-gray-800 text-xs">{this.$t("shortcut.study")}</span>
                            <b class="block font-medium  text-xl mt-4">{this.$t("shortcut.blog")}</b>
                        </div>
                        <div class="mt-2 text-primary">{this.$t("shortcut.study")}</div>
                    </RouterLink>
                </NGi>
                <NGi span="3 m:1">
                    <RouterLink to="/" class="card-link">
                        <div>
                            <span class=" text-gray-800 text-xs">{this.$t("shortcut.help")}</span>
                            <b class="block font-medium  text-xl mt-4">{this.$t("shortcut.service")}</b>
                        </div>
                        <div class="mt-2  text-primary">{this.$t("shortcut.contact")}</div>
                    </RouterLink>
                </NGi>
            </NGrid>
        )
    }
})