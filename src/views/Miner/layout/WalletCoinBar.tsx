/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 10:13:37
 * @LastEditTime: 2022-05-05 15:22:24
 */


import { useApp } from "@/store";
import { Copy } from "@vicons/ionicons5";
import { NAvatar, NButton, NIcon, NPopover, useMessage } from "naive-ui";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import useClipboard from 'vue-clipboard3'
export default defineComponent({
    name: "WalletCoinBar",
    setup() {
        const { toClipboard } = useClipboard()
        const message = useMessage()
        const { getCoinPictures } = useApp()
        const { params: { coin, wallet } } = useRoute();
        return {
            path: getCoinPictures.get((coin as string).toUpperCase()),
            wallet,
            handleCopy() {
                toClipboard(wallet as string).then(() => {
                    message.success("Copy to clipboard successfully！")
                })
            }
        }
    },
    render() {
        return (
            <div class="flex items-center">
                <NAvatar round size={40} src={this.path} style={{ minWidth: "40px" }}></NAvatar>
                <div class="min-w-0 pr-3 pl-3">
                    <a href="#" class="font-medium block text-xl leading-10 text-current truncate hover:text-primary">{this.wallet}</a>
                </div>
                <NPopover>
                    {{
                        trigger: () => <NButton secondary circle class="align-middle" onClick={this.handleCopy}><NIcon size={18}><Copy></Copy></NIcon> </NButton>,
                        default: () => <span>拷贝</span>
                    }}
                </NPopover>
            </div>
        )
    }
})