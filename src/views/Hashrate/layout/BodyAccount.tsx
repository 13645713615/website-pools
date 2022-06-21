/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-21 09:47:52
 * @LastEditTime: 2022-06-21 17:52:33
 */
import { NAlert, NDivider, NSpace } from "naive-ui";
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import Table from "./Table";
import { Columns } from "./Table/option";

export default defineComponent({
    name: "BodyAccount",
    props: {
        cion: String,
        data: Object as PropType<{
            hash: string,
            offline: number | string,
            online: number | string,
            yesReward: string,
            money: string,
            amountAll: string,
            accountDetailModelList: Columns[]
        }>
    },
    setup(props) {
        const { t } = useI18n()
        return () => (
            <div>
                <NDivider class="!mt-0 !mb-3"></NDivider>
                <NSpace vertical>
                    <NAlert>
                        <NSpace size="large">
                            <div>
                                <small class="font-medium mr-1">{t("title.latestRevenue")}</small>
                                <span class="text-primary">{props.data?.money}</span>
                            </div>
                            <div>
                                <small class="font-medium mr-1">{t("title.yesterdayearnings")}</small>
                                <span class="text-primary">{props.data?.yesReward}</span>
                            </div>
                            <div>
                                <small class="font-medium mr-1">{t("title.totalRevenue")}</small>
                                <span class="text-primary">{props.data?.amountAll}</span>
                            </div>
                        </NSpace>
                    </NAlert>
                    <Table cion={props.cion} data={props.data?.accountDetailModelList}></Table>
                </NSpace>
            </div>
        )
    }
})