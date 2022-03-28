/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 17:39:50
 * @LastEditTime: 2022-03-25 16:44:17
 */

import ModalForm, { AlertProps } from "@/components/ModalForm";
import VerificationCodeButton from "@/components/VerificationCodeButton";
import { useEmiter } from "@/hooks";
import { createAddress, sendEmail, updateAddress } from "@/service/api";
import { useUser } from "@/store";
import { FormRules, NButton, NFormItem, NInput, NInputGroup, useMessage } from "naive-ui";
import { defineComponent, PropType, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Columns } from "../Table/option";

const modalFormEmiter = useEmiter<"ChangeAddressModalFormOpen">()
const fromData = { coinAddress: "", code: "" }
export default defineComponent({
    name: "ChangeAddressForm",
    setup() {
        const { t } = useI18n();
        const message = useMessage()
        const { userInfo } = useUser();
        const visible = ref<boolean>(false);
        const form = reactive({ ...fromData });
        const isCreate = ref<boolean>(true);
        let accountCoinInfo: Columns = null;
        const formRules: FormRules = {
            coinAddress: [
                { required: true, message: t("placeholder.coinAddress"), trigger: 'blur' }
            ]
        }
        modalFormEmiter.on("ChangeAddressModalFormOpen").subscribe((value: Columns) => {
            accountCoinInfo = value;
            isCreate.value = !value.adress
            visible.value = true
        });

        async function handleConfirmSend(next: (state?: boolean) => void) {
            try {
                await sendEmail(userInfo.email)
                message.success(t("tip.sentSuccessfully"));
                next()
            } catch (error: any) {
                message.error(error.message);
                next(false)
            }
        }

        async function handleCreate() {
            const { accountId, coin, id } = accountCoinInfo
            if (id) return Promise.reject({ message: "系统错误，请联系管理员" });
            return await createAddress({ coinAddress: form.coinAddress, currency: coin, accountId, })
        }

        async function handleUpdate() {
            const { accountId, id, coin } = accountCoinInfo
            if (id) return Promise.reject({ message: "系统错误，请联系管理员" });
            await updateAddress({ ...form, accountId, id, type: 1, typeKey: 1, coin })
        }

        function handleSubmit(next: (props: AlertProps) => void) {
            next({ visible: false });
            const handle = isCreate.value ? handleCreate : handleUpdate;
            handle().then(() => {
                next({ visible: false });
                Object.assign(form, fromData)
            }).catch(res => {
                next({ visible: true, message: res.message })
            })
        }


        return function () {
            return (
                <ModalForm model={form} onSubmit={handleSubmit} rules={formRules} size="large" v-model={[visible.value, "visible"]} title={t("title.setCoinAddress")}>
                    <NFormItem path="coinAddress">
                        <NInput v-model={[form.coinAddress, "value"]} placeholder={t("form.coinAddress")}></NInput>
                    </NFormItem>
                    {
                        !isCreate.value && (
                            <NFormItem path="code">
                                <NInputGroup>
                                    <NInput type="text" v-model={[form.code, "value"]} placeholder={t("form.emailCode")}></NInput>
                                    <VerificationCodeButton onConfirm={handleConfirmSend} class="md:w-40 w-32" tiem={120} text={t("button.send")}></VerificationCodeButton>
                                </NInputGroup>
                            </NFormItem>
                        )
                    }
                </ModalForm>
            )
        }
    }
})


const ChangeAddressFormButton = defineComponent({
    name: "ChangeAddressFormButton",
    props: {
        data: Object as PropType<Columns>
    },
    setup(props) {
        const { t } = useI18n()
        function handleOpen() {
            modalFormEmiter.emit("ChangeAddressModalFormOpen", props.data)
        }
        return function () {
            return (
                <NButton text onClick={handleOpen}>{t("button.setCoinAddress")}</NButton>
            )
        }
    }
})

export { ChangeAddressFormButton }