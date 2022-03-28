/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 17:39:50
 * @LastEditTime: 2022-03-25 21:01:15
 */

import ModalForm, { AlertProps } from "@/components/ModalForm";
import { useEmiter } from "@/hooks";
import { creacteCoinAddress } from "@/service/api";
import { useUser } from "@/store";
import { PersonAddOutline } from "@vicons/ionicons5";
import { FormRules, NButton, NFormItem, NIcon, NInput } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const modalFormEmiter = useEmiter<"AccountModalFormOpen">()
const fromData = { name: "", remarkName: "" }
export default defineComponent({
    name: "CreateForm",
    setup() {
        const { t } = useI18n();
        const { setUsersAccount } = useUser();
        const visible = ref<boolean>(false);
        const form = reactive({ ...fromData })
        const formRules: FormRules = {
            name: [
                { required: true, message: t("placeholder.accountName"), trigger: 'blur' }
            ]
        }
        modalFormEmiter.on("AccountModalFormOpen").subscribe((value) => visible.value = value);

        function handleSubmit(next: (props: AlertProps) => void) {
            creacteCoinAddress(form).then(() => {
                next({ visible: false })
                const data = { ...form, coin: [] };
                setUsersAccount(form.name, data)
                Object.assign(form, fromData)
            }).catch(res => {
                next({ visible: true, message: res.message })
            })
        }

        return function () {
            return (
                <ModalForm model={form} onSubmit={handleSubmit} rules={formRules} size="large" v-model={[visible.value, "visible"]} title={t("title.addAccount")}>
                    <NFormItem path="name">
                        <NInput v-model={[form.name, "value"]} placeholder={t("form.accountName")}></NInput>
                    </NFormItem>
                    <NFormItem path="remarkName">
                        <NInput v-model={[form.remarkName, "value"]} placeholder={t("form.remark")}></NInput>
                    </NFormItem>
                </ModalForm>
            )
        }
    }
})


const CreateFormButton = defineComponent({
    name: "CreateForm",
    setup() {
        const { t } = useI18n()
        function handleOpen() {
            modalFormEmiter.emit("AccountModalFormOpen", true)
        }
        return function () {
            return (
                <NButton type="primary" class="w-32" v-slots={{icon:()=> <NIcon component={PersonAddOutline}/>}} onClick={handleOpen}>{t("button.addAccount")}</NButton>
            )
        }
    }
})

export { CreateFormButton }