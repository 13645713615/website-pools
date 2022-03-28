/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 18:36:25
 * @LastEditTime: 2022-03-16 17:12:37
 */

import { PaginationProps } from "naive-ui";


export default class SetData implements PaginationProps{

    public pageSize = 20;

    public pageNo = 1;

    public pageSizes: number[] = [20 ,50, 100, 200, 500];

    public showSizePicker: boolean = true;

    public itemCount: number;

    public get page(): number {
        return this.pageNo
    }

    private trigger: (this: SetData) => void;

    constructor() {
        
    }

    public onChange = (page) => {
        this.pageNo = page;
        this.trigger?.apply(this);
    }

    public onUpdatePageSize(pageSize) {
        this.pageSize = pageSize;
        this.pageNo = 1;
        this.trigger?.apply(this);
    }

    public on(fn: (this: SetData) => void) {
        this.trigger = fn
    }
}