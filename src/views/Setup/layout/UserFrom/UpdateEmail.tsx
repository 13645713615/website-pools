/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-09-13 11:04:21
 * @LastEditTime: 2022-09-13 14:38:59
 */

import VerificationCodeButton from "@/components/VerificationCodeButton";
import { sendEmail, updateEmail } from "@/service/api";
import { useUser } from "@/store";
import { NAlert, NForm, NFormItem, NInput, NButton, NInputGroup, FormRules, FormInst, useMessage, FormItemInst } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "UpdateEmail",
    setup() {
        const { t } = useI18n()
        const { userInfo, $patch } = useUser();
        const message = useMessage();
        const loading = ref<boolean>(false);
        const isUpdate = ref<boolean>(true);
        const formRef = ref<FormInst | null>(null);
        const rEmailFormItemRef = ref<FormItemInst | null>(null);
        const formData = reactive({ code: "", email: userInfo.email, password: "" });
        const alert = reactive({ visible: false, message: "" });
        const rules: FormRules = {
            email: [
                { required: true, message: t("rules.email"), trigger: ['blur', "email-input"] }
            ],
            password: [
                { required: true, message: t("rules.password"), trigger: ['blur'] }
            ],
            code: [
                { required: true, message: t("rules.emailCode"), trigger: "blur" }
            ],
        }

        async function handleConfirmSend(next: (state?: boolean) => void) {
            try {
                await rEmailFormItemRef.value?.validate({ trigger: "email-input" })
                await sendEmail(formData.email)
                alert.visible = true;
                message.success(t("tip.sentSuccessfully"));
                next()
            } catch (error: any) {
                alert.visible = true;
                alert.message = Array.isArray(error) ? error[0].message : error.message;
                next(false)
            }
        }
        function handleSubmit(e: Event) {
            e.preventDefault();
            formRef.value?.validate((errors) => {
                if (!errors) {
                    loading.value = true;
                    updateEmail(formData).then(() => {
                        alert.visible = false;
                        isUpdate.value = true;
                        message.success("修改成功！")
                        $patch((state) => {
                            state.userInfo.email = formData.email;
                        })
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
                    <NFormItem label={t("form.email")} path="email" ref={(ref) => rEmailFormItemRef.value = ref}>
                        <NInput v-model={[formData.email, "value"]} disabled={isUpdate.value}></NInput>
                    </NFormItem>
                    {
                        isUpdate.value ?
                            (<NButton class="w-28" onClick={() => isUpdate.value = false}>{t("button.update")}</NButton>) :
                            (
                                <>
                                    <NFormItem label={t("form.emailCode")} path="code">
                                        <NInputGroup>
                                            <NInput type="text" v-model={[formData.code, "value"]}></NInput>
                                            <VerificationCodeButton onConfirm={handleConfirmSend} class="md:w-40 w-32" tiem={120} text={t("button.send")}></VerificationCodeButton>
                                        </NInputGroup>
                                    </NFormItem>
                                    <NFormItem path="password" label={t("form.password")}>
                                        <NInput type="password" v-model={[formData.password, "value"]}></NInput>
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