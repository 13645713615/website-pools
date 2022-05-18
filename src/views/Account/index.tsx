/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 15:54:29
 * @LastEditTime: 2022-05-18 18:12:40
 */


import { NSpace } from "naive-ui";
import { defineComponent, onActivated, onDeactivated } from "vue";
import { useI18n } from "vue-i18n";
import AccountSelect from "@/components/AccountSelect";
import CreateForm, { CreateFormButton } from "./layout/Create";
import Table from "./layout/Table";
import { useUser } from "@/store";
import CleanHours from "./layout/CleanHours";
import { AccountModalOpenBtn } from "@/components/AccountModal";

let isActiva: boolean = false;

export default defineComponent({
    name: "Account",
    setup() {
        const { t } = useI18n();
        const { loadUsersCoins } = useUser();
        onActivated(() => {
            if (isActiva) loadUsersCoins();
            isActiva = false;
        })
        onDeactivated(() => {
            isActiva = true;
        })
        return function () {
            return (
                <div class="min-h-ctx">
                    <div class="flex items-center justify-between flex-wrap">
                        <h3 class="text-xl">{t("title.account")}</h3>
                        <NSpace align="center" justify="space-between" >
                            <CleanHours></CleanHours>
                            <AccountModalOpenBtn class="w-32"></AccountModalOpenBtn>
                            {/* <AccountSelect mode="select" class="w-32"></AccountSelect> */}
                            <CreateFormButton></CreateFormButton>
                        </NSpace>
                    </div>
                    <Table></Table>
                    <CreateForm></CreateForm>
                </div>
            )
        }
    }
})