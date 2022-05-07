/*
 * @Descripttion:
 * @version:
 * @Author: Carroll
 * @Date: 2022-02-26 10:13:35
 * @LastEditTime: 2022-04-19 20:32:57
 */

import { defineComponent } from "vue";
import Configure from "@components/Configure"
import { useApp } from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const { language, setLanguage } = useApp();
    setLanguage(language);
    // 土豪调用
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
