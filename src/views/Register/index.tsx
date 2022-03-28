/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-06 17:56:25
 * @LastEditTime: 2022-03-27 14:44:23
 */


import { defineComponent, reactive, ref } from "vue";
import { FormInst, FormItemInst, FormRules, NAlert, NButton, NCheckbox, NForm, NFormItem, NInput, NInputGroup, NSpace, useMessage } from "naive-ui";
import Subscriber from "@/layout/Subscriber";
import { RouterLink, useRouter } from "vue-router";
import VerificationCodeButton from "@/components/VerificationCodeButton";
import { useI18n } from "vue-i18n";
import { registEmail, sendEmail } from "@/service/api";

export default defineComponent({
    name: "Register",
    setup() {
        const { push } = useRouter();
        const { t } = useI18n()
        const message = useMessage()
        const formRef = ref<FormInst | null>(null);
        const rEmailFormItemRef = ref<FormItemInst | null>(null);
        const loading = ref<boolean>(false);
        const alert = reactive({ visible: false, message: "" });
        const agreement = ref<boolean>(false);
        const formData = reactive({
            email: "",
            emailCode: "",
            username: "",
            password: "",
            verifyPassword: "",
        })
        const rules: FormRules = {
            email: [
                { required: true, message: t("rules.email"), trigger: ['blur', "email-input"] }
            ],
            emailCode: [
                { required: true, message: t("rules.emailCode"), trigger: "blur" }
            ],
            username: [
                { required: true, message: t("rules.username"), trigger: 'blur' }
            ],
            password: [
                { required: true, message: t("rules.password"), trigger: 'blur' }
            ],
            verifyPassword: [
                { validator: (_rule, value) => !!formData.password && formData.password.startsWith(value) && formData.password.length >= value.length, trigger: 'blur', message: t("rules.passwordatypism") }
            ],
        }

        return {
            rules,
            formRef,
            alert,
            loading,
            formData,
            rEmailFormItemRef,
            agreement,
            handleSubmit(e: Event) {
                e.preventDefault();
                formRef.value?.validate((errors) => {
                    if (!errors) {
                        loading.value = true;
                        registEmail(formData).then(() => {
                            alert.visible = false;
                            push({ name: "login" })
                        }).catch((res) => {
                            alert.visible = true;
                            alert.message = res.message;
                        }).finally(() => {
                            loading.value = false
                        })
                    }
                })
            },
            async handleConfirmSend(next: (state?: boolean) => void) {
                try {
                    await rEmailFormItemRef.value?.validate({ trigger: "email-input" })
                    await sendEmail(formData.email)
                    alert.visible = false;
                    message.success(t("tip.sentSuccessfully"));
                    next()
                } catch (error: any) {
                    alert.visible = true;
                    alert.message = Array.isArray(error) ? error[0].message : error.message;
                    next(false)
                }
            }
        }
    },
    render() {
        return (
            <Subscriber class="min-h-so md:pt-24  pt-12">
                <div class="w-full lg:max-w-lg md:max-w-md xl:max-w-xl  m-auto md:shadow md:bg-white md:text-black md:p-4 rounded-lg ">
                    <NForm showLabel={false} onSubmit={this.handleSubmit} size="large" ref={(ref) => this.formRef = ref} class="md:text-current text-white" rules={this.rules} model={this.formData} >
                        <NSpace justify="space-between" align="center" >
                            <h1 class="text-2xl mb-6 text-current">{this.$t("title.register")}</h1>
                            <RouterLink to="/login" class="text-current mr-2"><NButton text class="text-current underline">{this.$t("button.goLogin")}</NButton></RouterLink>
                        </NSpace>
                        {this.alert.visible && <NAlert class="mb-3" type="error" closable onClose={() => this.alert.visible = false}>{this.alert.message}</NAlert>}
                        <NFormItem path="email" ref={(ref) => this.rEmailFormItemRef = ref}>
                            <NInput type="text" v-model={[this.formData.email, "value"]} placeholder={this.$t("form.email")}></NInput>
                        </NFormItem>
                        <NFormItem path="emailCode">
                            <NInputGroup class=" bg-white">
                                <NInput type="text" v-model={[this.formData.emailCode, "value"]} placeholder={this.$t("form.emailCode")}></NInput>
                                <VerificationCodeButton onConfirm={this.handleConfirmSend} class="md:w-40 w-32" tiem={120} text={this.$t("button.send")}></VerificationCodeButton>
                            </NInputGroup>
                        </NFormItem>
                        <NFormItem path="username">
                            <NInput type="text" v-model={[this.formData.username, "value"]} placeholder={this.$t("form.username")}></NInput>
                        </NFormItem>
                        <NFormItem path="password">
                            <NInput type="password" v-model={[this.formData.password, "value"]} placeholder={this.$t("form.password")}></NInput>
                        </NFormItem>
                        <NFormItem path="verifyPassword">
                            <NInput type="password" v-model={[this.formData.verifyPassword, "value"]} placeholder={this.$t("form.verifyPassword")}></NInput>
                        </NFormItem>
                        <div class="pr-2 pl-2 pb-4 flex items-center">
                            <NCheckbox v-model={[this.agreement, "checked"]} style={{ "--n-text-color": "currentColor" }}>{this.$t("operation.agree")}</NCheckbox><NButton text tag="a" class="underline text-current"> {this.$t("file.agreement")}</NButton>
                        </div>
                        <div class="text-center">
                            <NButton type="success" class="w-full md:w-32" disabled={!this.agreement} size="large" loading={this.loading} attrType="submit">{this.$t("button.register")}</NButton>
                        </div>
                    </NForm>
                </div>
            </Subscriber>
        )
    }
})


