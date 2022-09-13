/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-23 11:24:36
 * @LastEditTime: 2022-09-13 14:21:49
 */


import VerificationCodeButton from "@/components/VerificationCodeButton";
import { sendEmail, updateUser } from "@/service/api";
import { useUser } from "@/store";
import { FormInst, FormItemInst, FormRules, NAlert, NButton, NCard, NDivider, NForm, NFormItem, NInput, NInputGroup, useMessage } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";

export default defineComponent({
    name: "UserFrom",
    setup() {
        const { t } = useI18n()

        const alert = reactive({ visible: false, message: "" });

        return function () {
            return (
                <NCard v-slots={{ header: () => <h3 class="text-xl m-0">{t("title.setup")}</h3> }}>
                    <UpdateEmail></UpdateEmail>
                    <NDivider></NDivider>
                    <UpdatePassword></UpdatePassword>
                </NCard>
            )
        }
    }
})