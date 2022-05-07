/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-23 15:45:16
 * @LastEditTime: 2022-03-27 16:58:00
 */

import { NSpace, } from "naive-ui";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Help from "./layout/Help";
import Table from "./layout/Table";

export default defineComponent({
    name: "Extract",
    setup() {
        const { t } = useI18n()

        return function () {
            return (
                <div class="min-h-ctx">
                    <NSpace vertical size={16}>
                        <Table></Table>
                        <Help></Help>
                    </NSpace>
                </div>
            )
        }
    }
})