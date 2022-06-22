/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 15:54:29
 * @LastEditTime: 2022-06-22 10:30:15
 */


import { NButtonGroup, NCard, NSpace } from "naive-ui";
import { defineComponent, onActivated, onDeactivated } from "vue";
import CreateForm, { CreateFormButton, UpdateFormButton } from "./layout/Create";
import Table from "./layout/Table";
import { useUser } from "@/store";
import CleanHours from "./layout/CleanHours";
import { AccountModalOpenBtn } from "@/components/AccountModal";

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
                    <NCard class="mt-6">
                        <div class="flex justify-between">
                            <NSpace align="center">
                                <CleanHours></CleanHours>
                                <AccountModalOpenBtn class="w-32"></AccountModalOpenBtn>
                            </NSpace>
                            <NSpace align="center">
                                <NButtonGroup>
                                    <CreateFormButton></CreateFormButton>
                                    <UpdateFormButton></UpdateFormButton>
                                </NButtonGroup>
                            </NSpace>
                        </div>
                        <Table class="mt-6"></Table>
                    </NCard>
                    <CreateForm></CreateForm>
                </div>
            )
        }
    }
})