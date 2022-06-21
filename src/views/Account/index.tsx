/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 15:54:29
 * @LastEditTime: 2022-06-21 17:39:40
 */


import { NButton, NButtonGroup, NCard, NIcon, NSpace } from "naive-ui";
import { defineComponent, onActivated, onDeactivated } from "vue";
import { useI18n } from "vue-i18n";
import AccountSelect from "@/components/AccountSelect";
import CreateForm, { CreateFormButton, UpdateFormButton } from "./layout/Create";
import Table from "./layout/Table";
import { useUser } from "@/store";
import CleanHours from "./layout/CleanHours";
import { AccountModalOpenBtn } from "@/components/AccountModal";
import Delete from "./layout/Delete";

let isActiva: boolean = false;

export default defineComponent({
    name: "Account",
    setup() {
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
                <div >
                    <div class="flex items-center justify-between flex-wrap md:absolute top-0 right-0">
                        <NSpace align="center" justify="space-between">
                            {/* <AccountSelect mode="select" class="w-32"></AccountSelect> */}
                            <NButtonGroup>
                                <CreateFormButton></CreateFormButton>
                                <UpdateFormButton></UpdateFormButton>
                                {/* <Delete></Delete> */}
                            </NButtonGroup>
                        </NSpace>
                    </div>
                    <NCard class="mt-6">
                        <NSpace align="center">
                            <CleanHours></CleanHours>
                            <AccountModalOpenBtn class="w-32"></AccountModalOpenBtn>
                        </NSpace>
                        <Table class="mt-6"></Table>
                    </NCard>
                    <CreateForm></CreateForm>
                </div>
            )
        }
    }
})