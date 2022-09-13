/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-09-13 14:19:01
 * @LastEditTime: 2022-09-13 14:41:51
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-09-13 11:04:21
 * @LastEditTime: 2022-09-13 14:15:32
 */

import VerificationCodeButton from "@/components/VerificationCodeButton";
import { sendEmail, updateEmail, updatePw } from "@/service/api";
import { useUser } from "@/store";
import { NAlert, NForm, NFormItem, NInput, NButton, NInputGroup, FormRules, FormInst, useMessage, FormItemInst } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "UpdatePassword",
    setup() {
        const { t } = useI18n()
        const { } = useUser();
        const message = useMessage();
        const loading = ref<boolean>(false);
        const isUpdate = ref<boolean>(true);
        const formRef = ref<FormInst | null>(null);
        const formData = reactive({ olderPassword: "", newPassword: "", verifyPassword: "" });
        const alert = reactive({ visible: false, message: "" });
        const rules: FormRules = {
            olderPassword: [
                { required: true, message: t("rules.email"), trigger: ['blur'] }
            ],
            newPassword: [
                { required: true, message: t("rules.password"), trigger: ['blur'] }
            ],
            verifyPassword: [
                { required: true, message: t("rules.verifyPassword"), trigger: 'blur' },
                { validator: (_rule, value) => !!formData.newPassword && formData.newPassword === value && formData.newPassword.length >= value.length, trigger: 'blur', message: t("rules.passwordatypism") }
            ],
        }

        function handleSubmit(e: Event) {
            e.preventDefault();
            formRef.value?.validate((errors) => {
                if (!errors) {
                    loading.value = true;
                    updatePw(formData).then(() => {
                        alert.visible = false;
                        isUpdate.value = true;
                        message.success("修改成功！")
                    }).catch((res) => {
                        alert.visible = true;
                        alert.message = res.message;
                    }).finally(() => {
                        loading.value = false
                    })
                }
            })
        }

        return () => (
            <>
                {alert.visible && <NAlert class="mb-3" type="error" closable onClose={() => alert.visible = false}>{alert.message}</NAlert>}
                <NForm class="max-w-md" showRequireMark={!isUpdate.value} rules={rules} model={formData} onSubmit={handleSubmit} ref={(ref) => formRef.value = ref}>
                    {
                        isUpdate.value ?
                            (<>
                                <NFormItem label={t("form.password")}>
                                    <NInput type="password" value="carroll" disabled={isUpdate.value}></NInput>
                                </NFormItem>
                                <NButton class="w-28" onClick={() => isUpdate.value = false}>{t("button.update")}</NButton>
                            </>
                            ) :
                            (
                                <>
                                    <NFormItem path="olderPassword" label={t("form.olderPassword")}>
                                        <NInput type="password" v-model={[formData.olderPassword, "value"]}></NInput>
                                    </NFormItem>
                                    <NFormItem path="newPassword" label={t("form.newPassword")}>
                                        <NInput type="password" v-model={[formData.newPassword, "value"]}></NInput>
                                    </NFormItem>
                                    <NFormItem path="verifyPassword" label={t("form.verifyPassword")}>
                                        <NInput type="password" v-model={[formData.verifyPassword, "value"]}></NInput>
                                    </NFormItem>
                                    <NButton type="primary" loading={loading.value} class="w-28 mr-6" attrType="submit">{t("button.submit")}</NButton>
                                    <NButton class="w-28" onClick={() => isUpdate.value = true}>{t("button.cancel")}</NButton>
                                </>
                            )
                    }
                </NForm>
            </>
        )
    }
})