/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-05 14:49:10
 * @LastEditTime: 2022-07-18 17:56:31
 */

import { useUser } from "@/store";
import { objNoNempty } from "@/utils/tools";
import useRequest from "./api.request"
import { IJuHeRes, PaymentSearch, WorkerSearch } from "./api.types";
import { IRes, IResPromise } from "./IService";

const BAESURl = `${import.meta.env.VITE_APP_BASE_API}/v3/manager`
const BAESURlV2 = `${import.meta.env.VITE_APP_BASE_API}/v2/manager`
const agentHost = import.meta.env.VITE_APP_AGENT_HOST;
/**
 * @name: 获取币种相信
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function getIndexPool() {
    return useRequest.get(`${BAESURl}/getIndexPool`, {
        meta: {
            loading: false,
            cache: "app"
        }
    })
}

/**
 * @name: 获取图片
 * @msg: 
 * @param {number} type
 * @param {string} isOpen
 * @return {*}
 */
export function getPictures(type: number, isOpen?: string) {
    return useRequest.get(`${BAESURl}/getPictures`, { params: { type, isOpen }, meta: { cache: true } })
}

/**
 * @name: 公告
 * @msg: 
 * @param {number} type
 * @param {string} isOpen
 * @return {*}
 */
export function getNotice(type: number, isOpen?: string) {
    return useRequest.get(`${BAESURl}/getPictures`, { params: { type: 5, isOpen } })
}

/**
 * @name: 获取支持的币种
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function supportCoin() {
    return useRequest.get(`${BAESURl}/getSettingAllCoin`, { meta: { cache: true } })

}

/**
 * @name: 算力图表
 * @msg: 
 * @param {*} coin
 * @return {*}
 */
export function getPoolHash(coin) {
    return useRequest.get(`${BAESURl}/getPoolHash`, {
        params: { coin }
    })
}

/**
 * @name: 爆块列表
 * @msg: 
 * @param {*} coin
 * @return {*}
 */
export function getPoolBlockList(params: { coin: string, pageNum: number, pageSize: number }) {
    return useRequest.get(`${BAESURlV2}/blocks-list`, {
        params
    })
}

/**
 * @name: 报块图形
 * @msg: 
 * @param {*} coin
 * @return {*}
 */
export function getPoolBlock(coin) {
    return useRequest.get(`${BAESURlV2}/block-panel`, {
        params: { coin }
    })
}

/**
 * @name: 钱包地址查询
 * @msg: 
 * @param {*} coin
 * @param {*} address
 * @return {*}
 */
export function findDataByAddress(coin, address) {
    return useRequest.get(`${BAESURl}/findDataByAddress`, {
        params: { coin, address },
    })
}


/**
 * @name: 钱包面板数据
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getPanelData(params: { coin: string, accountname: string, token: string }) {
    return useRequest.get(`${BAESURl}/getPanelData`, {
        params: { ...params, agentHost },
    })
}


/**
 * @name: 日算力波动图
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getUserHashByDay(params: { coin: string, accountName: string, day: number, token: string }) {
    return params.day == 1 ?
        useRequest.get(`${BAESURl}/account-chart/getUserHashByDay`, {
            params: { ...params, agentHost },
        }) :
        useRequest.get(`${BAESURl}/account-chart/getUserHashByMonth`, {
            params: { ...params, agentHost }
        })
}

/**
 * @name: 日份额波动图
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getUserSharesDay(params: { coin: string, accountName: string, day: number, token: string }) {
    return params.day == 1 ?
        useRequest.get(`${BAESURl}/account-chart/usershares_day`, {
            params: { ...params, agentHost },
        }) :
        useRequest.get(`${BAESURl}/account-chart/usershares_month`, {
            params: { ...params, agentHost },
        })
}


/**
 * @name: 矿机算力图
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getWorkerHashByDay(params: { coin: string, accountName: string, workerName: string, day: number, token: string }) {
    return params.day == 1 ?
        useRequest.get(`${BAESURl}/worker-chart/getWorkerHashByDay`, {
            params
        }) :
        useRequest.get(`${BAESURl}/worker-chart/getWorkerHashByMonth`, {
            params
        })
}

/**
 * @name: 矿机日份额波动图
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getWorkersharesDay(params: { coin: string, accountName: string, workerName: string, day: number, token: string }) {
    return params.day == 1 ?
        useRequest.get(`${BAESURl}/worker-chart/workershares_day`, {
            params
        }) :
        useRequest.get(`${BAESURl}/worker-chart/workershares_month`, {
            params
        })
}


/**
 * @name: 矿机列表
 * @msg: 
 * @param {WorkerSearch} params
 * @return {*}
 */
export function getworkerlist(params: WorkerSearch) {
    return useRequest.get(`${BAESURl}/getworkerlist`, {
        params,
        meta: { loading: false }
    })
}



/**
 * @name: 获取全部矿机名称
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getworkerName(params: { accountname: string, coin: string }) {
    return useRequest.get(`${BAESURl}/getworkername`, {
        params,
        meta: { loading: false }
    })
}


/**
 * @name: 交易列表
 * @msg: 
 * @param {PaymentSearch} params
 * @return {*}
 */
export function getPaymentList(params: PaymentSearch) {
    return useRequest.get(`${BAESURl}/payments`, {
        params,
        meta: { loading: false }
    })
}


/**
 * @name: 实时收益图
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getEarningChart(params: { coin: string, accountName: string, token: string }) {
    return useRequest.get(`${BAESURl}/earning_chart`, {
        params,
    })
}

/**
 * @name: 结算波动图
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getSettlementChart(params: { coin: string, accountName: string, token }) {
    return useRequest.post(`${BAESURl}/settlement`, {
        params,
    })
}



/**
 * @name: 结算列表
 * @msg: 
 * @param {string} token
 * @return {*}
 */
export function getSettlementList(params: { coin: string, accountName: string, token, size: number, current: number, month: string }) {
    return useRequest.post(`${BAESURl}/settlement_table`, {
        params,
    })
}

/**
 * @name: 收益面板
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getEarningPanel(params: { coin: string, accountName: string, token }) {
    return useRequest.get(`${BAESURl}/earning_panel`, {
        params,
    })
}


/**
 * @name: 币种详细信息
 * @msg: 
 * @param {string} coin
 * @return {*}
 */
export function getIndexPoolInfo(coin: string) {
    return useRequest.get(`${BAESURl}/getIndexPoolInfo`, {
        params: { coin },
        meta: { cache: true, loading: false }
    })
}



/**
 * @name: 矿工算力排行榜
 * @msg: 
 * @param {string} coin
 * @return {*}
 */
export function getWorkerMinerTop(coin: string) {
    return useRequest.get(`${BAESURlV2}/workerminer-top`, { params: { coin }, meta: { loading: false } })
}


/**
 * @name: 获取货币汇率
 * @msg: 聚合接口
 * @param {*}
 * @return {*}
 */
export function getFinanceExchange(): Promise<IJuHeRes> {
    return useRequest.get("/finance/exchange/rmbquot", {
        params: { type: 1, bank: 0, key: "778d6dac585b68858f131970a3509056" },
        meta: { cache: true, },
        isPassRule: (res) => res.resultcode == "200"
    })
}



/**
 * @name: 登录
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function login(data: { username: string, password: string, place?: string }): IResPromise<any> {
    return useRequest.post(`${BAESURl}/login`, {
        handleError: (value) => value,
        meta: { loading: false },
        data
    })
}


/**
 * @name: 退出
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function signOut(token) {
    return useRequest.get(`${BAESURl}/signOut`, { params: { token } })
}

/**
 * @name: 发送邮箱验证码
 * @msg: 
 * @param {string} email
 * @return {*}
 */
export function sendEmail(email: string) {
    return useRequest.get(`${BAESURl}/sendEmail`, {
        params: { email },
        meta: { loading: false }
    })
}


/**
 * @name: 邮箱注册
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function registEmail(data: { username: string, email: string, emailCode: string, password: string }) {
    return useRequest.post(`${BAESURl}/registEmail`, { data, meta: { loading: false } })
}


/**
 * @name: 忘记密码
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function forget(data: { userKey: string, password: string, code: string, type: number }) {
    return useRequest.post(`${BAESURl}/forget`, { data, meta: { loading: false } })
}


/**
 * @name: 获取子账户｜币种
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function usersAndCoins() {
    return useRequest.get(`${BAESURl}/coin-users`)
}


/**
 * @name: 根据币种获取子账户
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getCoinAddressByCoin(params: { coin: string, isSet: boolean }) {
    return useRequest.get(`${BAESURl}/selectCoinAddressByCoin`, {
        params: { ...params, agentHost },
    })
}


/**
 * @name: 根据多币种获取子账户
 * @msg: 
 * @param {string} coins
 * @return {*}
 */
export async function getAccountCoin(coins: string[]): Promise<IRes<any[]>> {
    const [...result] = await Promise.all(coins.map((coin) => getCoinAddressByCoin({ coin: coin.toLocaleLowerCase(), isSet: false })));
    const data = [];
    result.forEach(({ data: item }, index) => {
        if (Array.isArray(item)) {
            data.push(item.map(account => ({ ...account, currency: coins[index].toLowerCase() })))
        }
    })
    return {
        status: 200,
        data: data.flat(),
        message: "请求成功"
    }
}

/**
 * @name: 获取子账户币种信息
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getCoinAddress(params: { coin: string, accountName: string }) {
    return useRequest.get(`${BAESURl}/getCoinAddress`, {
        params,
        meta: { loading: false }
    })
}


/**
 * @name: 创建子账户
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function creacteCoinAddress(data: { name: string, remarkName?: string }) {
    return useRequest.post(`${BAESURl}/account_add`, {
        data,
        meta: { loading: false }
    })
}

/**
 * @name: 修改备注
 * @msg: 
 * @param undefined
 * @return {*}
 */
export function updateRemarkName(data: { accountName: string, remarkName: string }) {
    return useRequest.post(`${BAESURl}/updateRemarkName`, {
        data,
        meta: { loading: false }
    })
}
export function deleteName(accountName: string) {
    return useRequest.post(`${BAESURl}/deleteName`, {
        params: { accountName },
        meta: { loading: false }
    })
}



/**
 * @name: 获取用户和登录信息
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function getUserLoginInfo() {
    const { getToken } = useUser()
    return useRequest.post(`${BAESURl}/findLogin`, {
        meta: { loading: false },
        params: { token: getToken }
    })
}

/**
 * @name: 修改账户信息
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function updateUser(data: { username: string, code: string, newEmail: string, oldEmail: string, updateType: string, type: number, newPwd?: string }) {
    return useRequest.post(`${BAESURl}/updateUser`, {
        data
    })
}

/**
 * @name: 修改账户信息
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function updateAddress(data: { id: number, coinAddress: string, code: string, type: number, typeKey: number, accountId: number, coin: string, key?: string }) {
    return useRequest.post(`${BAESURl}/address_change`, {
        data
    })
}

/**
 * @name: 创建账户信息
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function createAddress(data: { accountId: number, currency: string, coinAddress: string, key?: string }) {
    return useRequest.post(`${BAESURl}/address_add`, {
        data
    })
}

/**
 * @name: 获取提币设置
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getAutomaticPayStatus(params: { username: number, coin: string }) {
    return useRequest.get(`${BAESURl}/automatic_pay/status`, {
        params,
        meta: { loading: false },
    })
}

/**
 * @name: 修改提币设置
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getAutomaticPayOpen(data: { username: number, coin: string, paychain: number, openflag: number }) {
    return useRequest.post(`${BAESURl}/automatic_pay/open`, {
        data,
        meta: { loading: false },
    })
}


/**
 * @name: 提币列表
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getAutomaticPayList(params: { username: number, coin: string }) {
    return useRequest.get(`${BAESURl}/automatic_pay/list`, {
        params,
        meta: { loading: false },
    })
}


/**
 * @name: 根据子账户获取提币列表
 * @msg: 
 * @param {string} accountName
 * @return {*}
 */
export function getAutomaticPayByNameList(accountName: string) {
    return useRequest.get(`${BAESURl}/getAutomaticScale`, {
        params: { accountName },
        meta: { loading: false },
    })
}

/**
 * @name: 添加提币
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function addAutomaticPay(params: { username: string, coin: string, code: string, email: string, arrList: string }) {
    return useRequest.post(`${BAESURl}/automatic_pay/add_address`, {
        params,
        meta: { loading: false },
    })
}

/**
 * @name: 修改提币
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function updateAutomaticPay(params: { username: string, coin: string, code: string, email: string, address: string, scale: number, remark: string, id: number }) {
    return useRequest.post(`${BAESURl}/automatic_pay/update`, {
        params,
        meta: { loading: false },
    })
}

/**
 * @name: 删除提币
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function deleteAutomaticPay(id: number) {
    return useRequest.post(`${BAESURl}/automatic_pay/delete`, {
        params: { id }
    })
}


/**
 * @name: 分享
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function shareAccount(data: { accountName: string, coin: string, time?: number, isPermanent: boolean, type: string }) {
    return useRequest.post(`${BAESURl}/shareAccount`, {
        data,
        meta: {
            loading: false
        }
    })
}

/**
 * @name: 获取分享token
 * @msg: 
 * @param {string} url
 * @return {*}
 */
export function analysisShareUrl(url: string) {
    return useRequest.get(`${BAESURl}/analysisShareUrl`, {
        params: { url }
    })
}


/**
 * @name: 解析token
 * @msg: 
 * @param {string} token
 * @return {*}
 */
export function validateToken(token: string) {
    return useRequest.get(`${BAESURl}/validateToken`, {
        params: { token }
    })
}



/**
 * @name: 设置清楚时间
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function setCleanHours(data: { accountId: number, hours: number }) {
    return useRequest.post(`${BAESURl}/setCleanHours`, {
        data
    })
}

/**
 * @name: 分享列表
 * @msg: 
 * @param {*}
 * @return {*}
 */
export function getFollow() {
    return useRequest.get(`${BAESURl}/collect/list `)
}


/**
 * @name: 保存
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function saveFollow(data: { collectType: number, collectUrl: string, coinType: string, collectAccountName?: string, collectRemark?: string }) {
    return useRequest.post(`${BAESURl}/collect/save`, {
        headers: { "Content-Type": "application/json;charset=utf-8" },
        data
    })
}

/**
 * @name: 修改
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function updateFollow(data: { id: number, collectType: number, collectUrl: string, coinType: string, collectRemark: string }) {
    return useRequest.post(`${BAESURl}/collect/update`, {
        headers: { "Content-Type": "application/json;charset=utf-8" },
        data
    })
}

/**
 * @name: 删除
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function deleteFollow(collectUrl: string) {
    return useRequest.delete(`${BAESURl}/collect/${collectUrl}`)
}


/**
 * @name: 删除
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function checkFollow(collectUrl: string) {
    return useRequest.get(`${BAESURl}/collect/check`, {
        params: { collectUrl }
    })
}



/**
 * @name: 分享记录
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function getShareAddressList(data: { accountName: string, coin: string }) {
    return useRequest.post(`${BAESURl}/getShareAddressList`, {
        data
    })
}

/**
 * @name: 删除分享记录
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function delShareAddress(data: { accountName: string, key: string }) {
    return useRequest.post(`${BAESURl}/delShareAddress`, {
        data
    })
}


/**
 * @name: 修改分享记录
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function submitShareAddress(data: { accountName: string, key: string, type: string, remark: string }) {
    return useRequest.post(`${BAESURl}/submitShareAddress`, {
        data
    })
}



/**
 * @name: 用户矿机信息
 * @msg: 
 * @return {*}
 */
export function userCalculatingPower() {
    return useRequest.post(`${BAESURl}/UserCalculatingPower`)
}


/**
 * @name: 获取用户下所有子账户收益
 * @msg: 
 * @return {*}
 */
export function userAccountProfit(data?: { coin: string, type: string, dateStart?: string, dateEnd?: string }) {
    return useRequest.post(`${BAESURl}/UserAccountProfit`,
        {
            headers: { "Content-Type": "application/json;charset=utf-8" },
            data: objNoNempty(data)
        })
}



/**
 * @name 小额提币申请
 * @msg: 
 * @param {object} data
 * @return {*}
 */
export function automaticPayment(data: { username: string, coin: string }) {
    return useRequest.post(`${BAESURl}/automatic-payment/`, {
        meta: {
            loading: false,
        },
        data
    })
}

/**
 * @name 申请列表
 * @msg: 
 * @param {object} params
 * @return {*}
 */
export function automaticPaymentList(params: { username: string, coin: string }) {
    return useRequest.get(`${BAESURl}/automatic-payment/`, {
        params
    })
}


export function automaticPaymenCancelt(params: { username: string, coin: string }) {
    return useRequest.delete(`${BAESURl}/automatic-payment/`, {
        params
    })
}
