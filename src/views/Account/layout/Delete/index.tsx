import { useService } from "@/hooks";
import { deleteName } from "@/service/api";
import { useUser } from "@/store";
import { NButton, NIcon, useDialog, useMessage } from "naive-ui";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-20 14:59:51
 * @LastEditTime: 2022-05-24 10:48:42
 */
export default defineComponent({
    name: "AccountDelete",
    setup() {
        const userStore = useUser();
        const dialog = useDialog()
        const { t } = useI18n();
        const message = useMessage();
        const service = useService(deleteName, { defaultValue: {}, params: () => userStore.getAccount }, (_, res) => {
            if (Number(res.status) == 200) {
                userStore.deleteUsersAccount(userStore.getAccount);
            } else {
                message.error(res.message);
               
            }
        })
        function handleDelete() {
            const d = dialog.warning({
                title: t("dialog.warning.title"),
                content: `${t("dialog.warning.delete")} ${userStore.getAccount}`,
                positiveText: t("dialog.warning.positiveText"),
                negativeText: t("dialog.warning.negativeText"),
                onPositiveClick: async () => {
                    service.run(undefined, () => {
                        d.loading = true;
                    });
                    return true;
                }
            })
        }
        return () => (

            userStore.getAccount && <NButton type="error" onClick={handleDelete} v-slots={{ icon: () => <NIcon> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none"><path d="M6.5 7v4a.5.5 0 0 0 1 0V7a.5.5 0 0 0-1 0zM9 6.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zM10 4h3a.5.5 0 0 1 0 1h-.553l-.752 6.776A2.5 2.5 0 0 1 9.21 14H6.79a2.5 2.5 0 0 1-2.485-2.224L3.552 5H3a.5.5 0 0 1 0-1h3a2 2 0 1 1 4 0zM8 3a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1zM4.559 5l.74 6.666A1.5 1.5 0 0 0 6.79 13h2.42a1.5 1.5 0 0 0 1.49-1.334L11.442 5H4.56z" fill="currentColor"></path></g></svg></NIcon> }} >{t("button.delAccount")}</NButton>
        )
    }
})