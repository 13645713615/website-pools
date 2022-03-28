/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-12 10:10:13
 * @LastEditTime: 2022-03-12 10:15:18
 */
import type { SeriesOption, XAXisComponentOption } from 'echarts';
import { CreateOption } from '..';

const wave: CreateOption = function (option, color) {
    if (color) option.color = color;
    return ({ legend, xData, yData }) => {
        // @ts-ignore
        (option.xAxis as XAXisComponentOption).data = xData;
        option.series = yData.map<SeriesOption>((data, index) => ({
            type: "line",
            name: legend[index],
            data,
            smooth: true,
            showSymbol: false,
            areaStyle: {},
            lineStyle: {
                width: 4,
            },
        }))
        return option
    }
}

export default wave