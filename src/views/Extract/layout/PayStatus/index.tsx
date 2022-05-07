import { useReactiveService, useService } from "@/hooks"
import { getAutomaticPayOpen, getAutomaticPayStatus } from "@/service/api"
import { useUser } from "@/store"
import { SaveOutline } from "@vicons/ionicons5"
import { NAlert, NSpace, NRadioGroup, NRadio, NSwitch, NSpin, NButton, useMessage, useDialog, NIcon } from "naive-ui"
import { defineComponent, PropType, toRef } from "vue"
import { useI18n } from "vue-i18n"

/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-24 15:06:53
 * @LastEditTime: 2022-05-02 11:58:43
 */
interface PayStatusData {
    openflag?: 1 | 0;
    paychain?: 1 | 0;
    paytime?: string;
    username?: string;
    coin?: string;
    updatets?: string;
}

export default defineComponent({
    name: "PayStatus",
    props: {
        coin: String
    },
    setup(props) {

        const { t } = useI18n();
        const message = useMessage();
        const dialog = useDialog();
        const currentAccountCoin = toRef(useUser(), "currentAccountCoin")
        const payStatusService = useReactiveService<PayStatusData>(getAutomaticPayStatus, { params: () => ({ username: currentAccountCoin.value[0], coin: props.coin }), immediate: true, defaultValue: {} })
        const payOpenService = useService(getAutomaticPayOpen, { defaultValue: {} }, (_, res) => {
            if (res.status == "200") message.success("保存成功！")
        })

        function handleUpdatePayStatus() {
            dialog.warning({
                title: t("dialog.warning.title"),
                content: t("tip.openAutomatic"),
                positiveText: t("dialog.warning.positiveText"),
                negativeText: t("dialog.warning.negativeText"),
                onPositiveClick: () => {
                    const [username] = currentAccountCoin.value
                    payOpenService.run({ ...payStatusService.data, username, coin: props.coin })
                }
            })
        }

        return function () {
            return (
                <NSpin show={payStatusService.loading}>
                    <NAlert type="warning" class="mb-4">
                        {t("tip.automaticWithdrawal")}
                        {/* <div class="text-red-400">
                            {t("tip.transferNetwork")}
                        </div> */}
                    </NAlert>
                    <NSpace class="text-lg pb-3" align="center" size={[32, 16]}>
                        <div>{t("title.transferNetwork", { coin: "ETH" })}:
                            <NRadioGroup v-model={[payStatusService.data.paychain, "value"]} class="ml-3">
                                <NRadio value={0}>{t("title.formalChain", { coin: "ETH" })}({t("title.charge")})</NRadio>
                                {/* <NRadio value={1}>OKEX({t("title.free")})</NRadio> */}
                            </NRadioGroup>
                        </div>
                        <div>{t("title.withdrawal")}:
                            <NSwitch checkedValue={1} uncheckedValue={0} v-model={[payStatusService.data.openflag, "value"]} class="ml-3"></NSwitch>
                        </div>
                    </NSpace>
                    <NButton class="float-right w-24" v-slots={{ icon: () => <NIcon component={SaveOutline} /> }} onClick={handleUpdatePayStatus} loading={payOpenService.loading} type="warning">保 存</NButton>
                </NSpin>
            )
        }
    }
})