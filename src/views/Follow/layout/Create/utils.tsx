/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-02 17:28:18
 * @LastEditTime: 2022-05-23 16:25:47
 */

import { saveFollow, updateFollow } from "@/service/api"
import { NSpace, NAvatar } from "naive-ui"
import { SelectMixedOption } from "naive-ui/lib/select/src/interface"

export function createOptions(value: string, key: string): SelectMixedOption {
    return {
        value: key.toLocaleLowerCase(),
        label: () => <NSpace align="center"><NAvatar size={30} src={value} round ></NAvatar><span>{key}</span></NSpace>
    }
}


export async function collection(data: { id?: number, collectUrl: string, collectAccountName?: string, coinType: string, collectRemark: string }, collectType: number) {
    if (data.id) {
        await updateFollow({ ...data, collectType, id: data.id })
    } else {
        await saveFollow({ ...data, collectType })
    }

}