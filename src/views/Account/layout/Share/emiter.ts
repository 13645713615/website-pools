/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-15 16:16:46
 * @LastEditTime: 2022-04-15 16:16:47
 */

import { useEmiter } from "@/hooks";


enum Share {
    ShareModalFormOpen,
    ShareModalOpen
}

const modalFormEmiter = useEmiter<Share>()


export { Share, modalFormEmiter } 