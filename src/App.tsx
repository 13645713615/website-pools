/*
 * @Descripttion:
 * @version:
 * @Author: Carroll
 * @Date: 2022-02-26 10:13:35
 * @LastEditTime: 2022-09-12 15:30:31
 */

import { defineComponent } from "vue";
import Configure from "@components/Configure"
import { useApp } from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const { language, setLanguage } = useApp();
    setLanguage(language);
    // 收费功能
    // loadFinanceExchange();
    return {
      language
    }
  },
  render() {
    return (
      <Configure language={this.language}>
        <router-view></router-view>
      </Configure>
    )
  },
});
