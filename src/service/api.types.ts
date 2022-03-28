/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 14:38:51
 * @LastEditTime: 2022-03-14 23:55:52
 */


export interface WorkerSearch {
    coin: string,
    user: string,
    token: string,
    pageSize: number,
    pageNo: number,
    type: number;
    //0 5分钟 ｜ 1 15分钟 ｜ 2 24小时
    minType: number,
    // 矿机名称
    millName?: string,
    // 排序key
    flag?: string,
    // 升降序,0是升序,1是降序
    upOrDown?: number
}

export interface PaymentSearch {
    coin: string,
    accountName: string,
    token: string,
    pageSize: number,
    pageNo: number,
    type: number
}




export type TCurrency = "美元" | "欧元" | "港币" | "日元" | "英镑"

interface IExchangeResult<T> {
    bankConversionPri: number,
    date: string,
    fBuyPri: number,
    fSellPri: number,
    mBuyPri: number,
    mSellPri: number,
    name: T,
    time: string,
}

export interface IJuHeRes {
    error_code: number,
    resultcode: number,
    reason: string,
    result: { [key in TCurrency]: IExchangeResult<key> }[]
}