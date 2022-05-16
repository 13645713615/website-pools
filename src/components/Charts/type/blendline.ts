/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-09-14 19:12:22
 * @LastEditTime: 2022-05-16 11:12:36
 */
import { useApp } from '@/store';
import { deepClone, formatHashrate, toFixed } from '@/utils/tools';
import type { TooltipComponentOption, XAXisComponentOption, YAXisComponentOption, TooltipComponentFormatterCallbackParams, DefaultLabelFormatterCallbackParams } from 'echarts';
import { toRef } from 'vue';
import { CreateOption } from '..';

const blendline: CreateOption = function (option) {
    const yAxis = option.yAxis as YAXisComponentOption;
    const coin = toRef(useApp(), "coin")
    option.yAxis = [yAxis, deepClone(yAxis)]
    // @ts-ignore
    yAxis.axisLabel.formatter = (value) => formatHashrate(value);

    (option.tooltip as TooltipComponentOption).formatter = function (params: TooltipComponentFormatterCallbackParams): string {
        const dataParams = params as DefaultLabelFormatterCallbackParams[];
        let res = dataParams[0].name;
        for (let i = 0; i < dataParams.length; i++) {
            const value = i == 0 ? formatHashrate(dataParams[i].data as string) : (toFixed(dataParams[i].data as string, 6) + " " + coin.value?.toLocaleUpperCase())
            res += "<br>" + dataParams[i].marker + dataParams[i].seriesName + "：" + value;
        }
        return res
    };

    return ({ legend, xData, yData }) => {
        [option.yAxis[0].name, option.yAxis[1].name] = legend;
        // @ts-ignore
        (option.xAxis as XAXisComponentOption).data = xData;
        const [line, bar] = yData;
        option.series = [
            {
                type: "line",
                name: legend[0],
                data: line,
                yAxisIndex: 0,
                showSymbol: false,
                color: "#0069FF",
                smooth: true,
                lineStyle: {
                    width: 4,
                },
            },
            {
                type: "bar",
                name: legend[1],
                yAxisIndex: 1,
                data: bar,
                color: "#41DA79",
            }
        ]
        return option
    }
}



export default blendline

