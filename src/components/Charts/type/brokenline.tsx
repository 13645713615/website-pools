/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-09-14 19:12:22
 * @LastEditTime: 2022-03-12 10:08:31
 */
import { formatHashrate } from '@/utils/tools';
import type { TooltipComponentOption, SeriesOption, XAXisComponentOption, YAXisComponentOption, TooltipComponentFormatterCallbackParams, DefaultLabelFormatterCallbackParams } from 'echarts';
import { CreateOption } from '..';

const brokenline: CreateOption = function (option, color) {
    (option.tooltip as TooltipComponentOption).formatter = xFormatter;
    // @ts-ignore
    (option.yAxis as YAXisComponentOption).axisLabel.formatter = (value) => formatHashrate(value);
    if (color) option.color = color;
    return ({ legend, xData, yData }) => {
        // @ts-ignore
        (option.xAxis as XAXisComponentOption).data = xData;
        option.series = yData.map<SeriesOption>((data, index) => ({
            type: "line",
            name: legend[index],
            data,
            showSymbol: false,
            smooth: true,
            lineStyle: {
                width: 4,
            },
        }))
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

export default brokenline

