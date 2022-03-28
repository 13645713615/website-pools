/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 15:40:39
 * @LastEditTime: 2022-03-27 14:37:14
 */

import { useWalletToken } from "@/hooks";
import { useApp } from "@/store";
import { localReadForever, localSaveForever } from "@/utils/cache";
import { NAutoComplete, NAvatar, NDropdown, NInput, SelectOption, useMessage } from "naive-ui";
import { AutoCompleteOption } from "naive-ui/lib/auto-complete/src/interface";
import { DropdownMixedOption } from "naive-ui/lib/dropdown/src/interface";
import { storeToRefs } from "pinia";
import { computed, defineComponent, PropType, reactive, ref, VNodeChild } from "vue";
import { useRouter } from "vue-router";

const cache = "ADDRESSCACHE";

interface SearchRecord { coin: string, wallet: string }

export default defineComponent({
    name: "Search",
    props: {
        size: {
            type: String as PropType<'small' | 'medium' | 'large'>,
            default: "medium"
        }
    },
    setup(props) {
        const coinRefs = ref<any>(null);
        const router = useRouter();
        const message = useMessage();
        const { getCoinPictures, supportCoin } = storeToRefs(useApp());
        const address = localReadForever<SearchRecord[]>(cache) || [];
        const setData = reactive<SearchRecord>({ coin: supportCoin.value[0], wallet: "" });
        const coinSize = computed(() => props.size === "large" ? 30 : 20)
        function createOptions(coin): DropdownMixedOption {
            return {
                key: coin,
                icon: () => <NAvatar size={30} src={getCoinPictures.value.get(coin)} round ></NAvatar>,
                label: () => <span class="pl-2">{coin}</span>
            }
        }
        async function handleSearch() {
            try {
                const { coin, wallet } = setData
                const token = await useWalletToken(coin, wallet);
                if (!address.some(({ wallet }) => wallet === wallet)) {
                    address.push({ coin, wallet })
                    if (address.length > Number(import.meta.env.VITE_APP_USER_SEARCH_CACHE_MAX)) address.shift();
                    localSaveForever(cache, address);
                }
                router.push({ name: "miner", params: { coin: coin.toLowerCase(), wallet, token } })
            } catch (error: any) {
                message?.info(error.message)
            }
        }
        return {
            coinRefs,
            setData,
            coinSize,
            coinOptions: computed<DropdownMixedOption[]>(() => supportCoin.value.map(createOptions)),
            coinPath: computed<string>(() => getCoinPictures.value.get(setData.coin)),
            inputOptions: address.map<AutoCompleteOption>(({ wallet }, index) => ({ label: wallet, value: index.toString() })),
            renderLabel({ value, label }: SelectOption): VNodeChild {
                const coin = address[Number(value)].coin.toUpperCase();
                return (
                    <div class="flex items-center pt-2 pb-2 ">
                        <NAvatar round size={coinSize.value} class="mr-2" src={getCoinPictures.value.get(coin)}></NAvatar>
                        <div class='truncate flex-1 min-w-0 text-base'>{label as string}</div>
                    </div>
                )
            },
            handleCoinSelect(value: string) {
                setData.coin = value;
            },
            handleInputSelect(value: string | number) {
                setData.wallet = address[Number(value)].wallet
                handleSearch();
            },
            handleKeydown(e: KeyboardEvent) {
                if (e.code === "Enter") {
                    handleSearch();
                }
                return false
            },
            handleInputFocus(handleFocus: (e: Event) => void, handleInput: (value: string) => void, e: MouseEvent) {
                if (!coinRefs?.value.selfRef.contains(e.target as HTMLElement)) {
                    handleFocus(e);
                    handleInput("open")
                }
            },
            handleSearch
        }
    },
    render() {
        return (
            <NAutoComplete size={this.size} clearAfterSelect renderLabel={this.renderLabel} onSelect={this.handleInputSelect} options={this.inputOptions}
                v-slots={{
                    default: ({ handleInput, handleFocus, handleBlur }) => {
                        return <NInput
                            v-slots={{
                                prefix: () => (
                                    <NDropdown onSelect={this.handleCoinSelect} trigger="click" options={this.coinOptions}>
                                        <NAvatar ref={(refs) => this.coinRefs = refs} class="cursor-pointer mr-2" round size={this.coinSize} src={this.coinPath} ></NAvatar>
                                    </NDropdown>
                                ),
                                suffix: this.$slots.suffix
                            }}
                            onKeydown={this.handleKeydown}
                            size={this.size}
                            v-model={[this.setData.wallet, "value"]}
                            placeholder={this.$t("placeholder.search")}
                            onClick={this.handleInputFocus.bind(this, handleFocus, handleInput)}
                            onBlur={handleBlur}
                        ></NInput>
                    }
                }}
                clearable
            />
        )
    }
})