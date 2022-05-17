/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-23 11:24:36
 * @LastEditTime: 2022-05-17 16:29:59
 */


import VerificationCodeButton from "@/components/VerificationCodeButton";
import { sendEmail, updateUser } from "@/service/api";
import { useUser } from "@/store";
import { FormInst, FormItemInst, FormRules, NAlert, NButton, NCard, NForm, NFormItem, NInput, NInputGroup, useMessage } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "UserFrom",
    setup() {
        const { t } = useI18n()
        const { userInfo, $patch } = useUser();
        const message = useMessage();
        const loading = ref<boolean>(false);
        const isUpdate = ref<boolean>(true);
        const formRef = ref<FormInst | null>(null);
        const rEmailFormItemRef = ref<FormItemInst | null>(null);
        const formData = reactive({ username: userInfo.username, code: "", newPwd: "", verifyPassword: "", newEmail: userInfo.email, oldEmail: userInfo.email, updateType: "email", type: 1 });
        const alert = reactive({ visible: false, message: "" });
        const rules: FormRules = {
            newEmail: [
                { required: true, message: t("rules.email"), trigger: ['blur', "email-input"] }
            ],
            code: [
                { required: true, message: t("rules.emailCode"), trigger: "blur" }
            ],
            newPwd: [
                { required: true, message: t("rules.password"), trigger: 'blur' }
            ],
            verifyPassword: [
                { required: true, message: t("rules.verifyPassword"), trigger: 'blur' },
                { validator: (_rule, value) => !!formData.newPwd && formData.newPwd.startsWith(value) && formData.newPwd.length >= value.length, trigger: 'blur', message: t("rules.passwordatypism") }
            ],
        }
        async function handleConfirmSend(next: (state?: boolean) => void) {
            try {
                await rEmailFormItemRef.value?.validate({ trigger: "email-input" })
                await sendEmail(formData.newEmail)
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
                    updateUser(formData).then(() => {
                        alert.visible = false;
                        isUpdate.value = true;
                        $patch((state) => {
                            state.userInfo.email = formData.newEmail;
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
        return function () {
            return (
                <NCard v-slots={{ header: () => <h3 class="text-xl m-0">{t("title.setup")}</h3> }}>
                    {alert.visible && <NAlert class="mb-3" type="error" closable onClose={() => alert.visible = false}>{alert.message}</NAlert>}
                    <NForm class="max-w-md" showRequireMark={!isUpdate.value} rules={rules} model={formData} onSubmit={handleSubmit} ref={(ref) => formRef.value = ref}>
                        <NFormItem label={t("form.email")} path="newEmail" ref={(ref) => rEmailFormItemRef.value = ref}>
                            <NInput v-model={[formData.newEmail, "value"]} disabled={isUpdate.value}></NInput>
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
                                            <NInput type="password" v-model={[formData.newPwd, "value"]}></NInput>
                                        </NFormItem>
                                        <NFormItem path="verifyPassword" label={t("form.verifyPassword")}>
                                            <NInput type="password" v-model={[formData.verifyPassword, "value"]} ></NInput>
                                        </NFormItem>
                                        <NButton type="primary" loading={loading.value} class="w-28 mr-6" attrType="submit">{t("button.submit")}</NButton>
                                        <NButton class="w-28" onClick={() => isUpdate.value = true}>{t("button.cancel")}</NButton>
                                    </>
                                )
                        }
                    </NForm>
                </NCard>
            )
        }
    }
})