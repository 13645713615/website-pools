/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 17:39:50
 * @LastEditTime: 2022-09-01 10:02:00
 */

import ModalForm, { AlertProps } from "@/components/ModalForm";

import { creacteCoinAddress, updateRemarkName } from "@/service/api";
import { useUser } from "@/store";
import { UsersAccount } from "@/store/global/user";
import { throttle } from "@/utils/tools";
import { PersonAddOutline } from "@vicons/ionicons5";
import { FormRules, NButton, NFormItem, NIcon, NInput, useNotification } from "naive-ui";
import { storeToRefs } from "pinia";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { modalFormEmiter, Account } from "./emiter";


const fromData = { name: "", remarkName: "" }
export default defineComponent({
    name: "CreateForm",
    setup() {
        const { t } = useI18n();
        const { setUsersAccount } = useUser();
        const isCreate = ref<boolean>(true);
        const visible = ref<boolean>(false);
        const form = reactive<{ name: string, remarkName: string }>({ ...fromData })
        const formRules: FormRules = {
            name: [
                { required: true, message: t("placeholder.accountName"), trigger: 'blur' }
            ]
        }
        modalFormEmiter.on(Account.AccountModalFormCreateOpen).subscribe(() => {
            isCreate.value = true;
            visible.value = true
        });

        modalFormEmiter.on(Account.AccountModalFormUpdateOpen).subscribe((data: { name: string, remarkName: string }) => {
            isCreate.value = false;
            visible.value = true
            Object.assign(form, data);
        });


        async function handleCreate() {
            await creacteCoinAddress(form)
        }
        async function handleUpdate() {
            const { name, remarkName } = form;
            await updateRemarkName({ accountName: name, remarkName });
        }

        function handleSubmit(next: (props: AlertProps) => void) {
            const handle = isCreate.value ? handleCreate : handleUpdate;
            handle().then(() => {
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
                <ModalForm showLabel model={form} onSubmit={handleSubmit} rules={formRules} size="large" v-model={[visible.value, "visible"]} title={isCreate.value ? t("title.addAccount") : t("title.editAccount")}>
                    <NFormItem path="name" label={t("form.accountName")}>
                        <NInput disabled={!isCreate.value} v-model={[form.name, "value"]} placeholder={t("form.accountName")}></NInput>
                    </NFormItem>
                    <NFormItem path="remarkName" label={t("form.remark")}>
                        <NInput v-model={[form.remarkName, "value"]} maxlength="30" placeholder={t("form.remark")}></NInput>
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
                if (account.length >= 20) {
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
                modalFormEmiter.emit(Account.AccountModalFormCreateOpen)
            }
        }, 500)

        return function () {
            return (

                <NButton type="primary" onClick={handleOpen} v-slots={{ icon: () => <NIcon component={PersonAddOutline} /> }} >{t("button.addAccount")}</NButton>
            )
        }
    }
})

const UpdateFormButton = defineComponent({
    name: "UpdateFormButton",
    setup() {
        const userStore = useUser();
        const { t } = useI18n();
        const handleOpen = throttle(() => {
            const { name, remarkName } = userStore.usersAccount[userStore.getAccount] || {}
            modalFormEmiter.emit(Account.AccountModalFormUpdateOpen, { name, remarkName })
        }, 500)
        return () => (
            userStore.getAccount && <NButton onClick={handleOpen} type="warning" v-slots={{ icon: () => <NIcon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill="none"><path d="M17 8.134V5.566C17 4.713 16.296 4 15.4 4H4.6C3.704 4 3 4.713 3 5.566v6.71c0 .853.704 1.566 1.6 1.566h1.6V17h.003l.002-.001l2.167-1.6l-.314 1.254c-.021.086-.037.17-.046.255l-1.213.895a1.009 1.009 0 0 1-1.4-.199a.978.978 0 0 1-.199-.59v-2.172h-.6c-1.436 0-2.6-1.149-2.6-2.566v-6.71C2 4.149 3.164 3 4.6 3h10.8C16.836 3 18 4.149 18 5.566V8.69a2.853 2.853 0 0 0-1-.556zm-2.193 1.412l-4.83 4.83a2.197 2.197 0 0 0-.577 1.02l-.375 1.498a.89.89 0 0 0 1.079 1.079l1.498-.375c.386-.096.739-.296 1.02-.578l4.83-4.83a1.87 1.87 0 1 0-2.645-2.644z" fill="currentColor"></path></g></svg></NIcon> }}>{t("button.editAccount")}</NButton>
        )
    }
})

export { CreateFormButton, UpdateFormButton }