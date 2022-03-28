/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 15:54:29
 * @LastEditTime: 2022-03-27 15:54:42
 */


import {  NSpace } from "naive-ui";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import AccountSelect from "@/components/AccountSelect";
import CreateForm, { CreateFormButton } from "./layout/Create";
import Table from "./layout/Table";

export default defineComponent({
    name: "Account",
    setup() {
        const { t } = useI18n()
        return function () {
            return (
                <div class="min-h-ctx">
                    <div class="flex items-center justify-between flex-wrap">
                        <h3 class="text-2xl">{t("title.account")}</h3>
                        <NSpace align="center" justify="space-between" size={24}>
                            <CreateFormButton></CreateFormButton>
                            <AccountSelect mode="select" class="w-32"></AccountSelect>
                        </NSpace>
                    </div>
                    <Table></Table>
                    <CreateForm></CreateForm>
                </div>
            )
        }
    }
})