/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-23 15:45:16
 * @LastEditTime: 2022-03-27 16:58:00
 */

import { NSpace, NCard, } from "naive-ui";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import AccountCoinBar from "@/components/AccountCoinBar";
import Help from "./layout/Help";
import PayStatus from "./layout/PayStatus";
import Table from "./layout/Table";

export default defineComponent({
    name: "Extract",
    setup() {
        const { t } = useI18n()

        return function () {
            return (
                <div class="min-h-ctx">
                    {/* <h3 class="text-2xl my-1">{t("title.extract")}</h3> */}
                    <NSpace vertical size={16}>
                        {/* <NCard>
                            <AccountCoinBar  />
                        </NCard>
                        <PayStatus></PayStatus> */}
                        <Table></Table>
                        <Help></Help>
                    </NSpace>
                </div>
            )
        }
    }
})