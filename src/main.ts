/*
 * @Descripttion:
 * @version:
 * @Author: Carroll
 * @Date: 2022-02-26 10:13:35
 * @LastEditTime: 2022-03-08 13:37:37
 */
import { createApp } from "vue";
import store from "@/store"
import App from "./App";
import router from './router';
import locale from "./locale"
import "@css/index.css";
import "@css/theme.css";
import { registeRsize } from "@/hooks/resize";
import Loading from "@components/Loading";

// const meta = document.createElement('meta')
// meta.name = 'naive-ui-style'
// document.head.appendChild(meta)
registeRsize();

createApp(App).use(Loading).use(store).use(locale).use(router).mount("#app");

