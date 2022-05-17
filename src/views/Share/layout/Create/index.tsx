import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import ModalForm, { AlertProps } from "@/components/ModalForm";
import { FormRules, NFormItem, NInput, NSelect } from "naive-ui";
import { shareAccount, submitShareAddress } from "@/service/api";
import { modalFormEmiter, Share } from "./emiter";
import { ShareModal, useOpenShare } from "./ShareCode";
import moduleOptions, { allModuleValue } from "@/views/Miner/module"
import { throttle } from "@/utils/tools";

export type AccountInfo = { coin: string, accountName: string }

interface ShareData {
    accountName: string;
    coin: string;
    key: string;
    time: number;
    type: string;
    remark: string;
}

const fromData = { time: 0, type: allModuleValue, remark: "" }

export const ShareForm = defineComponent({
    name: "ShareForm",
    emits: {
        finish: () => true,
    },
    setup(_, context) {
        const { t } = useI18n();
        const isCreate = ref<boolean>(true);
        const visible = ref<boolean>(false);
        const form = reactive<{ time: number, type: string[], remark: string }>({ ...fromData });
        let accountInfo: AccountInfo = null;
        let shareData: ShareData = null;
        const formRules: FormRules = {
            time: [
                { required: true, type: "number", message: t("rules.expiration"), trigger: 'change' }
            ],
            remark: [
                { required: true, message: t("rules.remark"), trigger: 'blur' }
            ]
        }

        modalFormEmiter.on(Share.ShareModalFormCreateOpen).subscribe((value: AccountInfo) => {
            Object.assign(form, { ...fromData });
            accountInfo = value;
            visible.value = true
            isCreate.value = true;
        });

        modalFormEmiter.on(Share.ShareModalFormUpdateOpen).subscribe((value: ShareData) => {
            shareData = value;
            isCreate.value = false;
            visible.value = true;
            Object.assign(form, { time: shareData.time, type: shareData.type?.split(","), remark: shareData.remark })
        });

        async function handleCreate() {
            const data = Object.assign({ isPermanent: false }, accountInfo, form, { type: form.type.join(",") });
            if (data.time === 0) {
                data.isPermanent = true;
            }
            return await shareAccount(data)
        }

        async function handleUpdate() {
            if (!shareData.key) return Promise.reject({ message: "系统错误，请联系管理员" });
            return await submitShareAddress({ ...shareData, ...form, type: form.type.join(",") })
        }

        function handleSubmit(next: (props: AlertProps) => void) {
            const handle = isCreate.value ? handleCreate : handleUpdate;
            handle().then((res) => {
                isCreate.value && useOpenShare(res.data);
                next({ visible: false })
                context.emit("finish")
            }).catch(res => {
                next({ visible: true, message: res.message })
            })
        }

        return () => (
            <>
                <ModalForm model={form} showLabel size="large" onSubmit={handleSubmit} rules={formRules} v-model={[visible.value, "visible"]} title={t("title.share")}>
                    <NFormItem path="remark" label={t("form.remark")}>
                        <NInput v-model={[form.remark, "value"]}></NInput>
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


export const useCreateSharel = throttle((data: AccountInfo) => {
    modalFormEmiter.emit(Share.ShareModalFormCreateOpen, data)
}, 500)


export const useUpdateSharel = throttle((data: ShareData) => {
    modalFormEmiter.emit(Share.ShareModalFormUpdateOpen, data)
}, 500)  
