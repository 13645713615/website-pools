/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-20 15:23:06
 * @LastEditTime: 2022-05-20 15:23:06
 */

import { useEmiter } from "@/hooks";


enum Account {
    AccountModalFormCreateOpen = "ShareModalFormCreateOpen",
    AccountModalFormUpdateOpen = "ShareModalFormUpdateOpen",
}

const modalFormEmiter = useEmiter<Account>()


export { Account, modalFormEmiter } 