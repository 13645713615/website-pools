/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-17 09:46:19
 * @LastEditTime: 2022-09-14 18:33:55
 */
import AccountCoinBar from "@/components/AccountCoinBar";
import { useUser } from "@/store";
import { NButton, NCard } from "naive-ui";
import { defineComponent, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useCreateSharel } from "./layout/Create";
import Table from "./layout/Table";

export default defineComponent({
    setup() {
        const { t } = useI18n()
        const currentAccountCoin = toRef(useUser(), "currentAccountCoin")
        function handleClick() {
            const [accountName, coin] = currentAccountCoin.value
            useCreateSharel({ accountName, coin })
        }
        return () => (
            <div class="min-h-ctx">
                <h3 class="text-xl">{t("title.sharemanage")}</h3>
                <NCard>
                    <div class="flex items-center flex-wrap">
                        <AccountCoinBar class="flex-1 min-w-0 mr-3" />
                        <NButton onClick={handleClick}>{t("button.addshare")}</NButton>
                    </div>
                </NCard>
                <Table></Table>
            </div>
        )
    }
})