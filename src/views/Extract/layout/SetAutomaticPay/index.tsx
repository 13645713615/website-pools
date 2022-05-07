/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-24 20:20:04
 * @LastEditTime: 2022-04-22 14:46:50
 */

import ModalForm, { AlertProps } from "@/components/ModalForm";
import VerificationCodeButton from "@/components/VerificationCodeButton";
import { useEmiter } from "@/hooks";
import { addAutomaticPay, sendEmail, updateAutomaticPay } from "@/service/api";
import { useApp, useUser } from "@/store";
import { PersonAddOutline } from "@vicons/ionicons5";
import { FormRules, NAvatar, NButton, NFormItem, NIcon, NInput, NInputGroup, NInputNumber, NSelect, NSpace, useMessage } from "naive-ui";
import { SelectMixedOption } from "naive-ui/lib/select/src/interface";
import { storeToRefs } from "pinia";
import { computed, defineComponent, PropType, reactive, ref, toRaw } from "vue";
import { useI18n } from "vue-i18n";
import { Columns } from "../Table/option";

enum SetAutomaticPay {
    Create,
    Update
}
export interface AutomaticPayFormData {
    address: string;
    scale: number | null;
    remark: string;
    code: string;
    id?: number;
    coin: string;
}
const modalFormEmiter = useEmiter<SetAutomaticPay>()
const formTemplateData: AutomaticPayFormData = { address: "", scale: null, remark: "", code: "", coin: "" }
export default defineComponent({
    name: "SetAutomaticPayForm",
    props: {
        onScales: Function as PropType<(coin: string, next: (scale: number) => void) => void>,
        onFinish: Function as PropType<(form: AutomaticPayFormData, isCreate: boolean) => void>,
    },
    emits: {
        finish: (_f: AutomaticPayFormData, _t: boolean) => true,
        scales: (_: string, _n: (scale: number) => void) => true
    },
    setup(_, context) {
        const { t } = useI18n();
        const appStore = useApp();
        const { userInfo, getAccount } = storeToRefs(useUser());
        const visible = ref<boolean>(false);
        const scales = ref<number>(0);
        const formData = reactive<AutomaticPayFormData>({ ...formTemplateData });
        const supportCoinOption = computed<SelectMixedOption[]>(() => {
            const components: SelectMixedOption[] = [];
            appStore.getSupportCoin.forEach((src, value) => {
                components.push({
                    label: () => <NSpace align="center"><NAvatar class="align-middle" size={30} round src={src}></NAvatar><span>{value}</span></NSpace>,
                    value: value.toLowerCase()
                })
            })
            return components
        })

        const isCreate = ref<boolean>(true);
        const message = useMessage()
        const surplusScale = computed<number>(() => 100 - scales.value)
        const formRules: FormRules = {
            address: [
                { required: true, message: t("rules.coinAddress"), trigger: 'blur' }
            ],
            scale: [
                { required: true, type: "number", message: t("rules.scale"), trigger: 'blur' }
            ],
            code: [
                { required: true, message: t("rules.emailCode"), trigger: 'blur' }
            ]
        }

        modalFormEmiter.on(SetAutomaticPay.Create).subscribe(() => {
            isCreate.value = true;
            Object.assign(formData, formTemplateData);
            handleChangeCoin(supportCoinOption.value[0].value as string)
            visible.value = true;
        });

        modalFormEmiter.on(SetAutomaticPay.Update).subscribe(({ address, remark, scale, coin, id }: Columns) => {
            isCreate.value = false;
            Object.assign(formData, formTemplateData, { address, remark, scale, id });
            handleChangeCoin(coin)
            scales.value -= scale;
            visible.value = true;
        });

        function handleChangeCoin(value: string) {
            formData.coin = value;
            context.emit("scales", value, (scale: number) => {
                scales.value = scale;
            });
        }

        async function handleConfirmSend(next: (state?: boolean) => void) {
            try {
                await sendEmail(userInfo.value.email)
                message.success(t("tip.sentSuccessfully"));
                next()
            } catch (error: any) {
                message.error(error.message);
                next(false)
            }
        }

        async function handleCreate() {
            const { address, scale, remark, code, coin } = formData
            return await addAutomaticPay({ code, email: userInfo.value.email, username: getAccount.value, coin, arrList: JSON.stringify([{ address, scale, remark }]) })
        }

        async function handleUpdate() {
            const { address, scale, remark, code, id, coin } = formData
            if (!id) return Promise.reject({ message: "系统错误，请联系管理员" });
            return await updateAutomaticPay({ address, email: userInfo.value.email, scale, remark, code, username: getAccount.value, coin, id })
        }

        function handleSubmit(next: (props: AlertProps) => void) {
            const handle = isCreate.value ? handleCreate : handleUpdate;
            handle().then(() => {
                next({ visible: false });
                context.emit("finish", toRaw(formData), isCreate.value)
            }).catch(res => {
                next({ visible: true, message: res.message })
            })
        }

        return function () {
            return (
                <ModalForm model={formData} onSubmit={handleSubmit} rules={formRules} size="large" v-model={[visible.value, "visible"]} title={t("title.setCoinAddress")}>
                    <NFormItem path="coin">
                        <NSelect onUpdateValue={handleChangeCoin} value={formData.coin} options={supportCoinOption.value}></NSelect>
                    </NFormItem>
                    <NFormItem path="address">
                        <NInput v-model={[formData.address, "value"]} maxlength={50} placeholder={t("form.coinAddress")}></NInput>
                    </NFormItem>
                    <NFormItem path="scale">
                        <NInputNumber max={surplusScale.value} min={1} v-slots={{ suffix: () => "%" }} v-model={[formData.scale, "value"]} placeholder={t("form.scale", { scale: surplusScale.value })}></NInputNumber>
                    </NFormItem>
                    <NFormItem path="code">
                        <NInputGroup>
                            <NInput type="text" maxlength={8} v-model={[formData.code, "value"]} placeholder={t("form.emailCode")}></NInput>
                            <VerificationCodeButton onConfirm={handleConfirmSend} class="md:w-40 w-32" tiem={120} text={t("button.send")}></VerificationCodeButton>
                        </NInputGroup>
                    </NFormItem>
                    <NFormItem path="remark">
                        <NInput type="textarea" maxlength={100} v-model={[formData.remark, "value"]} placeholder={t("form.remark")}></NInput>
                    </NFormItem>
                </ModalForm>
            )
        }
    }
})


const CreateButton = defineComponent({
    name: "SetAutomaticPayCreateButton",
    setup() {
        const { t } = useI18n()
        function handleOpen() {
            modalFormEmiter.emit(SetAutomaticPay.Create, true)
        }
        return function () {
            return (
                <NButton v-slots={{ icon: () => <NIcon component={PersonAddOutline} /> }} type="primary" onClick={handleOpen}>{t("button.addAutomaticPay")}</NButton>
            )
        }
    }
})

const EditButton = defineComponent({
    name: "SetAutomaticPayEditButton",
    props: {
        data: Object as PropType<Columns>
    },
    setup(props) {
        const { t } = useI18n()
        function handleOpen() {
            modalFormEmiter.emit(SetAutomaticPay.Update, props.data)
        }
        return function () {
            return (
                <NButton text onClick={handleOpen}>{t("button.edit")}</NButton>
            )
        }
    }
})


export { CreateButton, EditButton }