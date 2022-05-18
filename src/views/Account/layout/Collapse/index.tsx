/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-18 14:42:01
 * @LastEditTime: 2022-05-18 16:07:06
 */

import { useUser } from "@/store";
import { objectToArray } from "@/utils/tools";
import { NCollapse, NCollapseItem } from "naive-ui";
import { defineComponent, toRef } from "vue";
import CleanHours from "../CleanHours";
import Table from "../Table";

export default defineComponent({
    name: "Collapse",
    setup() {
        const usersAccount = toRef(useUser(), "usersAccount");
        function CollapseItem({ remarkName }, key: string) {
            return (
                <NCollapseItem title={`${remarkName} (${key})`} name={key} v-slots={{
                    "header-extra": () => <CleanHours account={key} key={key}></CleanHours>
                }}>
                    <Table account={key} key={key}></Table>
                </NCollapseItem>
            )
        }
        return () => (
            <div class="bg-white p-4">
                <NCollapse displayDirective="show">
                    {
                        objectToArray(usersAccount.value, CollapseItem)
                    }
                </NCollapse>
            </div>
        )
    }
})