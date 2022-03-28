/*
 * @Descripttion: 读取环境变量文件
 * @version: 
 * @Author: Carroll
 * @Date: 2021-06-17 14:40:29
 * @LastEditTime: 2021-07-28 15:56:45
 */

const { existsSync, readFileSync } = require("fs");
/** 解析环境变量内容 */
const parse = function (str) {
    const context = {};
    const regExp = '(\\S+)\\s*=\\s*(\\S+)';
    const list = str.match(new RegExp(regExp, 'g'));
    list && list.forEach((item) => {
        const data = item.match(new RegExp(regExp))
        const key = data ? data[1].trim() : undefined
        const value = data ? data[2].trim() : undefined
        key && (context[key] = value)
    })
    return context
}
module.exports = function () {
    const path = existsSync('.env.local') ? '.env.local' : '.env' // 判断根目录中是否存在 local 文件并优先使用
    const content = readFileSync(path, 'utf-8')
    return parse(content)
}