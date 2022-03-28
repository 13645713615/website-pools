/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-09-14 19:12:22
 * @LastEditTime: 2022-03-04 23:23:07
 */
import type { EChartsOption } from 'echarts';

export function createBaseOption(): EChartsOption {
    return {
        tooltip: {
            trigger: "axis"
        },
        color: ["#000000", "#E52140", "#0069FF", "#ECBF0F"],
        grid: {
            top: 10,
            left: '3%',
            right: '4%',
            bottom: 50,
            containLabel: true
        },
        legend: {
            align: 'left',
            bottom: 0
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: "#9BC4FF",
                    width: 2,
                }
            },
            axisLabel: {
                color: "#000000"
            }
        },
        yAxis:
        {
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#9BC4FF",
                    width: 2,
                }
            },
            axisLabel: {
                color: "#000000"
            },
        }
    }
}


