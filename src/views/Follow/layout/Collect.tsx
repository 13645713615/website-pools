/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-03 11:16:12
 * @LastEditTime: 2022-05-23 16:33:55
 */
import { usePathname, useService } from "@/hooks";
import { checkFollow, deleteFollow } from "@/service/api";
import { useUser } from "@/store";
import { throttle } from "@/utils/tools";
import { StarOutline, Star } from "@vicons/ionicons5";
import { NIcon, NButton, NPopconfirm, NInput, NSpace } from "naive-ui";
import { computed, defineComponent, ref, toRef, watch } from "vue";
import { collection } from "./Create/utils";
import router from "@/router";

export default defineComponent({
    name: "Collect",
    props: {
        pageName: String,
        url: String,
        coin: String,
        wallet: String
    },
    setup(props) {
        const remark = ref<string>(props.wallet)
        const getToken = toRef(useUser(), "getToken")
        const CollectICon = ref<JSX.Element>(<NIcon size={18} component={StarOutline} />);
        const isCheck = useService<boolean>(checkFollow, {
            defaultValue: false, params: () => props.url
        }, (data) => {
            CollectICon.value = !data ? <NIcon color={'#0069ff'} size={18} component={Star} /> : <NIcon size={18} component={StarOutline} />
        })

        watch(() => props.url, () => {
            getToken.value && isCheck.run()
        }, { immediate: true })

        const collectType = computed(() => {
            switch (props.pageName) {
                case "miner":
                    return 1
                case "share":
                    return 0
                default:
                    return -1
            }
        })


        const handleSelect = throttle(async () => {
            let collectAccountName: string;
            if (collectType.value === 0) {
                collectAccountName = props.wallet;
            }
            try {
                await collection({ collectAccountName, coinType: props.coin, collectRemark: remark.value, collectUrl: props.url }, collectType.value)
                isCheck.run()
            } catch (error) {
                console.error(error)
            }
        }, 1000)

        const handleCancel = throttle(async () => {
            try {
                await deleteFollow(props.url)
                isCheck.run()
            } catch (error) {
                console.error(error)
            }
        }, 1000)

        const handleLogin = () => {
            router.push({ name: "login", query: { redirect: usePathname() } }).then(() => {
                useUser().$reset();
            })
        }

        return () => {
            if (collectType.value != -1) {
                if (!getToken.value) {
                    return <NButton size="large" onClick={handleLogin} class="p-0 w-10 h-10 text-center" v-slots={{ icon: () => <NIcon size={18} component={StarOutline} /> }} />
                } else if (isCheck.data) {
                    return <NPopconfirm negativeText={null} placement="bottom-end" onPositiveClick={handleSelect} showIcon={false} v-slots={{ trigger: () => <NButton size="large" class="p-0 w-10 h-10 text-center" v-slots={{ icon: () => <NIcon size={18} component={StarOutline} /> }} /> }}>
                        <NSpace vertical>
                            <span>备注</span>
                            <NInput v-model={[remark.value, "value"]}></NInput>
                        </NSpace>
                    </NPopconfirm>
                } else {
                    return <NButton onClick={handleCancel} size="large" class="p-0 w-10 h-10 text-center" v-slots={{ icon: () => <NIcon color={'#0069ff'} size={18} component={Star} /> }}></NButton>
                }
            }
        }
    }
})
