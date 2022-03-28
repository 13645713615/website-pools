/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-09-14 19:12:22
 * @LastEditTime: 2022-03-12 10:08:39
 */
import { formatHashrate } from '@/utils/tools';
import type { TooltipComponentOption, XAXisComponentOption, YAXisComponentOption, TooltipComponentFormatterCallbackParams, DefaultLabelFormatterCallbackParams } from 'echarts';
import { CreateOption } from '..';

const blendline: CreateOption = function (option) {
    (option.tooltip as TooltipComponentOption).formatter = xFormatter;
    // @ts-ignore
    (option.yAxis as YAXisComponentOption).axisLabel.formatter = (value) => formatHashrate(value);
    return ({ legend, xData, yData }) => {
        // @ts-ignore
        (option.xAxis as XAXisComponentOption).data = xData;
        const [line, bar] = yData;
        option.series = [
            {
                type: "line",
                name: legend[0],
                data: line,
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
        res += "<br>" + dataParams[i].marker + dataParams[i].seriesName + "：" + formatHashrate(dataParams[i].data as string);
    }
    return res
}

export default blendline

