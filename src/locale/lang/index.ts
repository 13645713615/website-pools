/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-14 22:16:49
 * @LastEditTime: 2022-03-26 15:05:35
 */

// ["English","en"],["简体中文","zh"]]

import en from "@assets/images/en.svg"
import zh from "@assets/images/zh.svg"

interface Langs {
    [x: string]: {
        currency: "美元" | "人民币";
        name: string;
        icon: string;
        load: () => Promise<any>;
    }
}


const langs: Langs = {
    en: {
        currency: "美元",
        name: "English",
        icon: en,
        load: () => import("./en")
    },
    zh: {
        currency: "人民币",
        name: "简体中文",
        icon: zh,
        load: () => import("./zh")
    },
}

export default langs