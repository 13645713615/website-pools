/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-09-14 19:12:22
 * @LastEditTime: 2022-05-11 16:02:34
 */
import { deepClone, formatHashrate } from '@/utils/tools';
import type { TooltipComponentOption, XAXisComponentOption, YAXisComponentOption, TooltipComponentFormatterCallbackParams, DefaultLabelFormatterCallbackParams } from 'echarts';
import { CreateOption } from '..';

const blendline: CreateOption = function (option) {
    (option.tooltip as TooltipComponentOption).formatter = xFormatter;
    const yAxis = option.yAxis as YAXisComponentOption;
    option.yAxis = [yAxis, deepClone(yAxis)]
    // @ts-ignore
    yAxis.axisLabel.formatter = (value) => formatHashrate(value);

    return ({ legend, xData, yData }) => {
        [option.yAxis[0].name, option.yAxis[1].name] = legend;
        console.log(option);
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

function xFormatter(params: TooltipComponentFormatterCallbackParams): string {
    const dataParams = params as DefaultLabelFormatterCallbackParams[];
    let res = dataParams[0].name;
    for (let i = 0; i < dataParams.length; i++) {
        const value = i == 0 ? formatHashrate(dataParams[i].data as string) : parseInt(dataParams[i].data as string)
        res += "<br>" + dataParams[i].marker + dataParams[i].seriesName + "：" + value;
    }
    return res
}

export default blendline

