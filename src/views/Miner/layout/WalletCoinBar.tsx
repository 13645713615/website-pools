/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 10:13:37
 * @LastEditTime: 2022-03-25 11:34:57
 */


import { useApp } from "@/store";
import { Copy } from "@vicons/ionicons5";
import { NAvatar, NButton, NIcon } from "naive-ui";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import useClipboard from 'vue-clipboard3'
export default defineComponent({
    name: "WalletCoinBar",
    setup() {
        const { toClipboard } = useClipboard()
        const { getCoinPictures } = useApp()
        const { params: { coin, wallet } } = useRoute();
        return {
            path: getCoinPictures.get((coin as string).toUpperCase()),
            wallet,
            handleCopy() {
                toClipboard(wallet as string)
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
                <NButton secondary circle class="align-middle" onClick={this.handleCopy}><NIcon size={18}><Copy></Copy></NIcon> </NButton>
            </div>
        )
    }
})