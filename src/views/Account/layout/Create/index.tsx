/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 17:39:50
 * @LastEditTime: 2022-05-09 17:41:05
 */

import ModalForm, { AlertProps } from "@/components/ModalForm";
import { useEmiter } from "@/hooks";
import { creacteCoinAddress } from "@/service/api";
import { useUser } from "@/store";
import { UsersAccount } from "@/store/global/user";
import { throttle } from "@/utils/tools";
import { PersonAddOutline } from "@vicons/ionicons5";
import { FormRules, NButton, NFormItem, NIcon, NInput, useNotification } from "naive-ui";
import { storeToRefs } from "pinia";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const modalFormEmiter = useEmiter<"AccountModalFormOpen">()
const fromData = { name: "", remarkName: "" }
export default defineComponent({
    name: "CreateForm",
    setup() {
        const { t } = useI18n();
        const { setUsersAccount } = useUser();
        const visible = ref<boolean>(false);
        const form = reactive({ ...fromData })
        const formRules: FormRules = {
            name: [
                { required: true, message: t("placeholder.accountName"), trigger: 'blur' }
            ]
        }
        modalFormEmiter.on("AccountModalFormOpen").subscribe((value) => visible.value = value);

        function handleSubmit(next: (props: AlertProps) => void) {
            creacteCoinAddress(form).then(() => {
                next({ visible: false })
                const data = { ...form, coin: [] };
                setUsersAccount(form.name, data)
                Object.assign(form, fromData)
            }).catch(res => {
                next({ visible: true, message: res.message })
            })
        }

        return function () {
            return (
                <ModalForm showLabel model={form} onSubmit={handleSubmit} rules={formRules} size="large" v-model={[visible.value, "visible"]} title={t("title.addAccount")}>
                    <NFormItem path="name" label={t("form.accountName")}>
                        <NInput v-model={[form.name, "value"]} placeholder={t("form.accountName")}></NInput>
                    </NFormItem>
                    <NFormItem path="remarkName" label={t("form.remark")}>
                        <NInput v-model={[form.remarkName, "value"]} placeholder={t("form.remark")}></NInput>
                    </NFormItem>
                </ModalForm>
            )
        }
    }
})


const CreateFormButton = defineComponent({
    name: "CreateForm",
    setup() {
        const { t } = useI18n()
        const notification = useNotification()
        const { usersAccount, userAccountCoinData } = storeToRefs(useUser())
        const router = useRouter();

        function detectNotAccount(): boolean {
            if (!usersAccount.value || Object.keys(usersAccount.value).length === 0) return false
            let account: string[] = [];
            for (const key in usersAccount.value) {
                const item = usersAccount.value[key] as UsersAccount;
                const isExistAccount = item.coin.some(coin => {
                    const { offline, online } = userAccountCoinData.value[item.name + ":" + coin]
                    return offline + online
                })
              
                if (!isExistAccount) account.push(key);
                if (account.length >= 5) {
                    notice(account)
                    return true
                }
            }
            return false
        }

        function notice(account: string[]) {
            const n = notification.warning({
                title: t("dialog.warning.title"),
                meta: () => <span>{account}</span>,
                content: t("tip.notAccount"),
                action: () => <NButton text type="primary" onClick={() => { n.destroy(); router.push({ name: "started" }) }}>{t("button.started")}</NButton>
            })
        }

        const handleOpen = throttle(() => {
            if (!detectNotAccount()) {
                modalFormEmiter.emit("AccountModalFormOpen", true)
            }
        }, 500)

        return function () {
            return (
                <NButton type="primary" class="w-32" v-slots={{ icon: () => <NIcon component={PersonAddOutline} /> }} onClick={handleOpen}>{t("button.addAccount")}</NButton>
            )
        }
    }
})

export { CreateFormButton }