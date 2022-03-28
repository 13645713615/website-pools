/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-06 17:56:25
 * @LastEditTime: 2022-03-27 14:45:02
 */


import { defineComponent, reactive, ref } from "vue";
import { FormInst, FormItemInst, FormRules, NAlert, NButton, NForm, NFormItem, NInput, NInputGroup, useMessage } from "naive-ui";
import Subscriber from "@/layout/Subscriber";
import { useRouter } from "vue-router";
import VerificationCodeButton from "@/components/VerificationCodeButton";
import { useI18n } from "vue-i18n";
import { forget, sendEmail } from "@/service/api";

export default defineComponent({
    name: "Forget",
    setup() {
        const { push } = useRouter();
        const { t } = useI18n()
        const message = useMessage()
        const formRef = ref<FormInst | null>(null);
        const rEmailFormItemRef = ref<FormItemInst | null>(null);
        const loading = ref<boolean>(false);
        const alert = reactive({ visible: false, message: "" });
        const formData = reactive({
            userKey: "",
            password: "",
            code: "",
            type: 1,
        })
        const rules: FormRules = {
            userKey: [
                { required: true, message: t("rules.username"), trigger: ['blur', "email-input"] }
            ],
            code: [
                { required: true, message: t("rules.emailCode"), trigger: "blur" }
            ],
            password: [
                { required: true, message: t("rules.password"), trigger: 'blur' }
            ],
        }

        return {
            rules,
            formRef,
            alert,
            loading,
            formData,
            rEmailFormItemRef,
            handleSubmit(e: Event) {
                e.preventDefault();
                formRef.value?.validate((errors) => {
                    if (!errors) {
                        loading.value = true;
                        forget(formData).then(() => {
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
                    await sendEmail(formData.userKey)
                    alert.visible = true;
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
            <Subscriber class="min-h-so md:pt-40 pt-24">
                <div class="w-full lg:max-w-lg md:max-w-md xl:max-w-xl  m-auto  md:shadow md:bg-white md:text-black md:p-4 rounded-lg ">
                    <NForm showLabel={false} onSubmit={this.handleSubmit} size="large" ref={(ref) => this.formRef = ref} class="md:text-current text-white" rules={this.rules} model={this.formData} >
                        <h1 class="text-2xl mb-6 text-current">{this.$t("title.frorget")}</h1>
                        {this.alert.visible && <NAlert class="mb-3" type="error" closable onClose={() => this.alert.visible = false}>{this.alert.message}</NAlert>}
                        <NFormItem path="userKey" ref={(ref) => this.rEmailFormItemRef = ref}>
                            <NInput type="text" v-model={[this.formData.userKey, "value"]} placeholder={this.$t("form.email")}></NInput>
                        </NFormItem>
                        <NFormItem path="code">
                            <NInputGroup class=" bg-white">
                                <NInput type="text" v-model={[this.formData.code, "value"]} placeholder={this.$t("form.emailCode")}></NInput>
                                <VerificationCodeButton onConfirm={this.handleConfirmSend} class="md:w-40 w-32" tiem={120} text={this.$t("button.send")}></VerificationCodeButton>
                            </NInputGroup>
                        </NFormItem>
                        <NFormItem path="password">
                            <NInput type="password" v-model={[this.formData.password, "value"]} placeholder={this.$t("form.password")}></NInput>
                        </NFormItem>
                        <div class="text-center">
                            <NButton type="success" class="w-full md:w-32" size="large" loading={this.loading} attrType="submit">{this.$t("button.submit")}</NButton>
                        </div>
                    </NForm>
                </div>
            </Subscriber>
        )
    }
})


