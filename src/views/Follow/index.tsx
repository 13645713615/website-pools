/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-20 10:04:58
 * @LastEditTime: 2022-05-02 17:10:16
 */

import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import CreateForm, { CreateFormButton } from "./layout/Create";
import Table from "./layout/Table";


export default defineComponent({
    name: "Follow",
    setup() {
        const { t } = useI18n();
        const tableRefs = ref();
        function handleComplete() {
            tableRefs.value?.tableData.run();
        }
        return () => (
            <div class="min-h-ctx">
                <div class="flex items-center justify-between flex-wrap">
                    <h3 class="text-2xl">{t("title.follow")}</h3>
                    <CreateFormButton></CreateFormButton>
                </div>
                <Table ref={(refs) => tableRefs.value = refs}></Table>
                <CreateForm onComplete={handleComplete}></CreateForm>
            </div>
        )
    }
})