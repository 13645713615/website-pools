/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-15 16:16:46
 * @LastEditTime: 2022-05-20 15:22:57
 */

import { useEmiter } from "@/hooks";


enum Share {
    ShareModalFormCreateOpen = "ShareModalFormCreateOpen",
    ShareModalFormUpdateOpen = "ShareModalFormUpdateOpen",
    ShareModalOpen = "ShareModalOpen",
   
}

const modalFormEmiter = useEmiter<Share>()


export { Share, modalFormEmiter } 