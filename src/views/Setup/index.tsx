/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 15:54:29
 * @LastEditTime: 2022-09-13 14:14:09
 */


import { defineComponent } from "vue";
import Table from "./layout/Table";
import UserFrom from "./layout/UserFrom";

export default defineComponent({
    name: "Setup",
    setup() {
        return function () {
            return (
                <div class="min-h-ctx">
                    <UserFrom></UserFrom>
                    <Table></Table>
                </div>
            )
        }
    }
})