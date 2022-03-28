/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-06 11:40:33
 * @LastEditTime: 2022-03-27 14:43:38
 */

import { defineComponent, reactive, ref } from "vue";
import { FormInst, FormRules, NAlert, NButton, NForm, NFormItem, NInput, NSpace } from "naive-ui";
import Subscriber from "@/layout/Subscriber";
import { useUser } from "@/store";
import { RouterLink, useRoute, useRouter } from "vue-router";

const rules: FormRules = {
    username: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

export default defineComponent({
    name: "Login",
    setup() {
        const { login } = useUser();
        const { replace } = useRouter();
        const { query } = useRoute();
        const formRef = ref<FormInst | null>(null);
        const loading = ref<boolean>(false);
        const alert = reactive({ visible: false, message: "" });
        const formData = reactive({
            username: "",
            password: ""
        })

        return {
            formRef,
            alert,
            loading,
            formData,
            handleSubmit(e: Event) {
                e.preventDefault();
                formRef.value?.validate((errors) => {
                    if (!errors) {
                        loading.value = true;
                        login(formData).then(() => {
                            alert.visible = false;
                            replace({ path: query?.redirect as string | undefined || "/" })
                        }).catch(res => {
                            alert.visible = true;
                            alert.message = res.message;
                        }).finally(() => {
                            loading.value = false
                        })
                    }
                })
            }
        }
    },
    render() {
        return (
            <Subscriber class="min-h-so md:pt-40  pt-24">
                <div class="w-full lg:max-w-lg md:max-w-md xl:max-w-xl  m-auto  md:shadow md:bg-white md:text-black md:p-4 rounded-lg ">
                    <NForm showLabel={false} onSubmit={this.handleSubmit} size="large" ref={(ref) => this.formRef = ref} class="md:text-current text-white" rules={rules} model={this.formData} >
                    <h1 class="text-2xl mb-6 text-current text-center">{this.$t("title.login")}</h1>
                        {this.alert.visible && <NAlert class="mb-3" type="error" closable onClose={() => this.alert.visible = false}>{this.alert.message}</NAlert>}
                        <NFormItem path="username">
                            <NInput type="text" v-model={[this.formData.username, "value"]} placeholder={this.$t("form.username")}></NInput>
                        </NFormItem>
                        <NFormItem path="password">
                            <NInput type="password" v-model={[this.formData.password, "value"]} placeholder={this.$t("form.password")}></NInput>
                        </NFormItem>
                        <NSpace justify="space-between" class="block pr-2 pl-2 pb-4">
                            <RouterLink to="/forget" class="text-current"><NButton text class="text-current">{this.$t("button.forgetpwd")}</NButton></RouterLink>
                            <RouterLink to={{ name: "register" }} class="text-current mr-2"><NButton text class="text-current underline">{this.$t("button.registernow")}</NButton></RouterLink>
                        </NSpace>
                        <div class="text-center">
                            <NButton type="success" class="w-full md:w-32" size="large" loading={this.loading} attrType="submit">{this.$t("button.login")}</NButton>
                        </div>
                    </NForm>
                </div>
            </Subscriber>
        )
    }
})


