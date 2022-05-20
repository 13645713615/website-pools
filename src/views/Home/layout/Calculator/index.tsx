/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-15 11:04:49
 * @LastEditTime: 2022-03-16 15:41:25
 */

import Modal from "@/components/Modal"
import { useFnReactive, useService } from "@/hooks";
import Container from "@/layout/Container"
import { getIndexPoolInfo } from "@/service/api";
import { NButton, NCard, NGi, NGrid, NInput, NSelect, NSpace, NSpin } from "naive-ui"
import { computed, defineComponent, PropType, watch } from "vue"
import { RouterLink } from "vue-router";
import { dateOptions, SetData, unitOptions } from "./SetData";

export default defineComponent({
    name: "Calculator",
    props: {
        visible: Boolean,
        data: {
            type: Object as PropType<{ hashrateprice: number, price: number, [s: string]: string | number }>,
            default: () => ({
                hashrateprice: 0,
                price: 0,
                coinUnit: "",
                coinType: ""
            })
        }
    },
    emits: {
        "update:visible": (value: boolean) => true
    },
    setup(props, context) {
        const calculator = useFnReactive(new SetData(computed(() => props.data), 100));
        const service = useService(getIndexPoolInfo, { defaultValue: { en: "--", content: "...", homePath: "#" } });
        watch(() => props.data.coinUnit, (value) => service.run(value));

        return {
            calculator,
            service,
            handleClose() {
                context.emit("update:visible", false)
            }
        }
    },
    render() {
        return (
            <Modal visible={this.visible} onClose={this.handleClose} title={this.data.coinUnit as string}>
                <Container size="lg" class="w-screen p-6">
                    <NGrid cols={2} xGap={16} yGap={16} responsive="screen" itemResponsive={true}>
                        <NGi span="2 m:1" class="h-full">
                            <NSpin show={this.service.loading}>
                                <NCard class="h-full">
                                    <strong class="text-xl block mb-5">{this.service.data.en}</strong>
                                    {this.service.data.content}
                                    <strong class="text-base block mt-5">资源</strong>
                                    <NButton tag="a" {...{ href: this.service.data.homePath, target: "_blank" }} type="primary" text>区块浏览器</NButton>
                                </NCard>
                            </NSpin>
                        </NGi>
                        <NGi span="2 m:1">
                            <NCard v-slots={{ footer: () => <span>≈ {this.calculator.coinEarnings} {this.data.coinUnit} ({this.$n(this.calculator.moneyEarnings, "currency")}) {this.calculator.dateLable}</span> }}>
                                <strong class="text-xl block mb-5">收益计算器</strong>
                                <NInput type="text" size="large" value={this.calculator.scope} onInput={this.calculator.onUpdateScope}></NInput>
                                <div class="flex mt-4">
                                    <NSelect size="large" v-model={[this.calculator.unit, "value"]} options={unitOptions} class="mr-4"></NSelect>
                                    <NSelect size="large" value={this.calculator.date} onUpdateValue={this.calculator.onUpdateDate} options={dateOptions}></NSelect>
                                </div>
                            </NCard>
                            <RouterLink to={{ name: "GPU", params: { coin: this.data.coinType } }}>
                                <NButton size="large" class="mt-4" block type="primary">开始挖矿</NButton>
                            </RouterLink>
                        </NGi>
                    </NGrid>
                </Container>
            </Modal>
        )
    }
})