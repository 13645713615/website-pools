/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-15 16:16:46
 * @LastEditTime: 2022-05-17 14:37:26
 */

import { useEmiter } from "@/hooks";


enum Share {
    ShareModalFormCreateOpen,
    ShareModalFormUpdateOpen,
    ShareModalOpen,
   
}

const modalFormEmiter = useEmiter<Share>()


export { Share, modalFormEmiter } 