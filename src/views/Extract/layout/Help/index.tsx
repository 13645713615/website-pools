/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-23 22:38:50
 * @LastEditTime: 2022-06-22 10:58:46
 */

import { NCard, NDescriptions, NDescriptionsItem } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
    name: "Help",
    render() {
        return (
            <NCard>
                <NDescriptions size="large" title={this.$t("help.problem")} column={1}>
                    <NDescriptionsItem label={this.$t("help.h1")}>
                        <pre class="text-sm my-1 whitespace-pre-wrap break-words">{this.$t("help.t1")}</pre>
                    </NDescriptionsItem>
                    <NDescriptionsItem label={this.$t("help.h2")}>
                        <pre class="text-sm  my-1  whitespace-pre-wrap break-words">{this.$t("help.t2")}</pre>
                    </NDescriptionsItem>
                    <NDescriptionsItem label={this.$t("help.h3")}>
                        <pre class="text-sm  my-1 whitespace-pre-wrap break-words">{this.$t("help.t3")}</pre>
                    </NDescriptionsItem>
                </NDescriptions>
            </NCard>
        )

    }
})