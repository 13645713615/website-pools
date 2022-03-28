/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-04 16:09:00
 * @LastEditTime: 2022-03-11 11:08:51
 */

import { defineComponent, PropType, ref, watch } from 'vue';
import { VueEcharts } from 'vue3-echarts';
import type { EChartsOption, } from 'echarts';
import { createBaseOption } from './option';

export interface PropsOption {
    legend: Array<string>;
    yData: Array<Array<string | number | Date>>;
    xData: Array<string | number>,
}

export type CreateOption = (option: EChartsOption, color?: string[]) => (props: PropsOption) => EChartsOption;

export default defineComponent({
    name: "Charts",
    props: {
        color: Array as PropType<string[]>,
        data: {
            type: Object as PropType<PropsOption>,
            required: true
        },
        construct: {
            type: Function as PropType<CreateOption>,
            required: true
        }
    },
    setup(props) {
        const echarts = ref<any>();
        const option = ref(null);
        const updateOption = props.construct(createBaseOption(), props.color);
        const refreshOption = function (value: PropsOption) {
            if (echarts.value) {
                option.value = Object.assign({}, updateOption(value))
                // echarts.value.refreshChart()
            }
        }
        watch(props.data, refreshOption)

        return {
            echarts,
            option
        }
    },
    render() {
        return <VueEcharts {...{ option: this.option }} ref={(refs) => this.echarts = refs}></VueEcharts>
    },
})