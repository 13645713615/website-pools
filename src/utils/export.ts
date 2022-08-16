/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-12 15:47:42
 * @LastEditTime: 2022-08-12 18:38:00
 */



import { utils, write, writeFile } from 'xlsx'
import FileSaver from 'file-saver'
import { VNodeChild } from 'vue';


/**
 * @name: 导出表格
 * @msg: 
 * @param {string} path el
 * @param {string} fileName 文件名称
 * @return {*}
 */
export function exportTable(path: string, fileName: string) {
    const wb = utils.table_to_book(document.querySelector(path));

    const wbout = write(wb, { bookType: 'xlsx',bookSST:false, type: 'array' });
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
    } catch (e) {
        console.log(e, wbout);
    }
}


interface ColumnsData<C> {
    key: string,
    title: string | (() => string),
    render?: (rowData: C, rowIndex: number, key: string) => VNodeChild | string
}


export function exportDataTable<C, T extends ColumnsData<C>>({ data, columns }: { data: Array<Record<keyof C, any>>, columns: T[] }, fileName: string) {

    function _render(rowData: C, _rowIndex: number, key: string) {
        return rowData[key]
    }

    const header = new Map<string, T>(), body = [], dispaly = {};

    for (let index = 0; index < columns.length; index++) {
        const item = columns[index];
        dispaly[item.key] = typeof item.title === "function" ? item.title() : item.title;
        header.set(item.key, { ...item, render: item.render ?? _render });
    }

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const value: Record<keyof C | any, any> = {};
        for (const key in item) {
            if (header.has(key)) {
                const renderValue = header.get(key).render(item, i, key);
                if (typeof renderValue === "string" || typeof renderValue === "number") {
                    value[key] = isNaN(Number(renderValue)) ?renderValue  : Number(renderValue);
                }
            }
        }
        body.push(value);
    }

    body.unshift(dispaly);

    const sheet = utils.json_to_sheet(body, { header: [...header.keys()], skipHeader: true });

    console.log(body)

    const newbook = utils.book_new()

    utils.book_append_sheet(newbook, sheet, "Sheet1");

    const wbout = write(newbook, { bookType: 'xlsx', bookSST: false, type: 'array' });
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
    } catch (e) {
        console.log(e, wbout);
    }

}