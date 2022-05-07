/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-23 20:20:27
 * @LastEditTime: 2022-05-05 15:21:27
 */

import AccountSelect from "@/components/AccountSelect";
import { useApp, useUser } from "@/store";
import { Copy } from "@vicons/ionicons5";
import { NAvatar, NButton, NDropdown, NIcon, NPopover } from "naive-ui";
import { DropdownMixedOption } from "naive-ui/lib/dropdown/src/interface";
import { computed, defineComponent } from "vue";
import useClipboard from 'vue-clipboard3'
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
export default defineComponent({
    name: "AccountCoinBar",
    props: {
        showCoin: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const { t } = useI18n();
        const { toClipboard } = useClipboard()
        const { getCoinPictures } = useApp()
        const userStore = useUser();
        const wallet = computed<string>(() => userStore.getAccount);
        const path = computed<string>(() => getCoinPictures.get(userStore.getCoin?.toUpperCase()) || "")
        const coinOptions = computed<DropdownMixedOption[]>(() => userStore.getUserCoins.map(createOptions))

        function handleCopy() {
            toClipboard(wallet.value)
        }

        function handleCoinSelect(value: string) {
            userStore.setCoin(value)
        }

        function createOptions(coin): DropdownMixedOption {
            return {
                key: coin,
                icon: () => <NAvatar size={30} src={getCoinPictures.get(coin.toUpperCase())} round ></NAvatar>,
                label: () => <span class="pl-2">{coin}</span>
            }
        }

        function Empty() {
            return (
                <div>
                    <RouterLink to={{ name: "account" }}><NButton type="primary" >{t("button.addAccount")}</NButton></RouterLink>
                </div>
            )
        }

        function AccountCoinBar() {
            return (
                <div class="flex items-center">
                    {
                        props.showCoin &&
                        <NDropdown  onSelect={handleCoinSelect} trigger="click" options={coinOptions.value}>
                            <NAvatar class="cursor-pointer mr-6" round size={40} src={path.value} style={{ minWidth: "40px" }}></NAvatar>
                        </NDropdown>
                    }
                    <div class="mr-6 min-w-9">
                        <AccountSelect mode="dropdown" >
                            <a class="font-medium block text-xl leading-10 text-current truncate">{wallet.value}</a>
                        </AccountSelect>
                    </div>
                    <NPopover>
                        {{
                            trigger: () =>  <NButton secondary circle class="align-middle" onClick={handleCopy}><NIcon size={18}><Copy></Copy></NIcon> </NButton>,
                            default: () => <span>拷贝</span>
                        }}
                    </NPopover>
                </div>
            )
        }

        return wallet.value || path.value ? AccountCoinBar : Empty
    }
})