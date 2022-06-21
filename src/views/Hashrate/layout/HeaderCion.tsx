/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-20 17:51:26
 * @LastEditTime: 2022-06-21 17:52:22
 */
import { useApp } from "@/store";
import { formatHashrate } from "@/utils/tools";
import { NAvatar, NSpace } from "naive-ui";
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";


export default defineComponent({
    name: "HeaderCion",
    props: {
        coin: String,
        data: Object as PropType<{
            hash: string,
            offline: number | string,
            online: number | string,
            accountDetailModelList: Array<any>
        }>
    },
    setup(props) {

        const { t } = useI18n()

        const { getCoinPictures } = useApp();

        return () => (
            <div class="flex items-center gap-x-3 w-full flex-wrap">
                <NAvatar size={40} round src={getCoinPictures.get(props.coin.toUpperCase())}></NAvatar>
                <span class="uppercase">{props.coin}</span>
                <i class="flex-1 "></i>
                <div class="md:space-y-2 ">
                    <small class="text-gray-400">{t("title.realTimehashrate")}</small>
                    <p class="m-0">{formatHashrate(props.data.hash)}</p>
                </div>
                <i class="h-12 w-[1px] bg-[#efeff5] hidden md:block"></i>
                <div class="md:space-y-2 md:w-auto w-full  md:block flex  items-center  gap-x-4">
                    <small class="text-gray-400">{t("title.totalMiners")}</small>
                    <p class="m-0  space-x-2 ">
                        <span><small>{t("title.online")}</small> {props.data?.online}</span>
                        <i class=" h-4 w-[1px] bg-[#efeff5] hidden md:inline-block"></i>
                        <span><small>{t("title.offline")}</small> {props.data?.offline}</span>
                    </p>
                </div>
                <i class="h-12 w-[1px] bg-[#efeff5] hidden md:block"></i>
                <div class="md:space-y-2 md:block flex items-center gap-x-4">
                    <small class="text-gray-400">{t("title.working")}</small>
                    <p class="m-0">{props.data?.accountDetailModelList.length}</p>
                </div>
            </div>
        )
    }
})