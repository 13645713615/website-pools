/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 11:37:51
 * @LastEditTime: 2022-03-12 10:08:30
 */
import type { SeriesOption, XAXisComponentOption } from 'echarts';
import { CreateOption } from '..';

const columnar: CreateOption = function (option, color) {
    if (color) option.color = color;
    // @ts-ignore
    return ({ legend, xData, yData }) => {
        // @ts-ignore
        (option.xAxis as XAXisComponentOption).data = xData;
        option.series = yData.map<SeriesOption>((data, index) => ({
            type: "bar",
            name: legend[index],
            data,
            barGap: '-100%',
            barMaxWidth:40,
            stack: 'one',
            emphasis: {
                focus: 'series'
            },

        }))
        return option
    }
}

export default columnar

