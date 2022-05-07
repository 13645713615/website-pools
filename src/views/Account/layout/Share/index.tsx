/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-15 10:41:52
 * @LastEditTime: 2022-04-18 16:21:26
 */


import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import ModalForm, { AlertProps } from "@/components/ModalForm";
import { throttle } from "@/utils/tools";
import { FormRules, NFormItem, NRadioButton, NRadioGroup, NSelect } from "naive-ui";
import { shareAccount } from "@/service/api";
import { modalFormEmiter, Share } from "./emiter";
import { ShareModal, useOpenShare } from "./ShareCode";
import moduleOptions, { allModuleValue } from "@/views/Miner/module"

type AccountInfo = { coin: string, accountName: string }

const d = 86400000
const h = 3600000

const fromData = { time: h, type: allModuleValue }

export const ShareForm = defineComponent({
    name: "ShareForm",
    setup() {
        const { t } = useI18n();
        const visible = ref<boolean>(false);
        const form = reactive<{ time: number, type: string[] }>(fromData);
        let accountInfo: AccountInfo = null;
        const formRules: FormRules = {
            time: [
                { required: true, type: "number", message: t("rules.expiration"), trigger: 'change' }
            ]
        }

        modalFormEmiter.on(Share.ShareModalFormOpen).subscribe((value: AccountInfo) => {
            accountInfo = value;
            visible.value = true
        });

        function getData(): { accountName: string, coin: string, time?: number, isPermanent: boolean, type: string } {
            const data = Object.assign({ isPermanent: false }, accountInfo, form, { type: form.type.join(",") });
            if (data.time === 0) {
                data.isPermanent = true;
            }
            return data
        }

        function handleSubmit(next: (props: AlertProps) => void) {
            shareAccount(getData()).then((res) => {
                useOpenShare(res.data)
                next({ visible: false })
                Object.assign(form, fromData);
            }).catch(res => {
                next({ visible: true, message: res.message })
            })
        }

        return () => (
            <>
                <ModalForm model={form} showLabel size="large" onSubmit={handleSubmit} rules={formRules} v-model={[visible.value, "visible"]} title={t("title.share")}>
                    <NFormItem path="time" label={t("form.expiration")}>
                        <NRadioGroup v-model={[form.time, "value"]} class="w-full flex text-center">
                            <NRadioButton class="flex-1" value={h}>{t("date.hour")}</NRadioButton>
                            <NRadioButton class="flex-1" value={d}>{t("date.day")}</NRadioButton>
                            <NRadioButton class="flex-1" value={d * 30}>{t("date.month")}</NRadioButton>
                            <NRadioButton class="flex-1" value={0}>{t("date.permanent")}</NRadioButton>
                        </NRadioGroup>
                    </NFormItem>
                    <NFormItem path="type" label={t("form.module")}>
                        <NSelect v-model={[form.type, "value"]} multiple options={moduleOptions}></NSelect>
                    </NFormItem>
                </ModalForm>
                <ShareModal />
            </>
        )
    }
})


export const useOpenShareForm = throttle((data: AccountInfo) => {
    modalFormEmiter.emit(Share.ShareModalFormOpen, data)
}, 500)  