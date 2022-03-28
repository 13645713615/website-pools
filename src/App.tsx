/*
 * @Descripttion:
 * @version:
 * @Author: Carroll
 * @Date: 2022-02-26 10:13:35
 * @LastEditTime: 2022-03-14 23:27:40
 */

import { defineComponent } from "vue";
import Configure from "@components/Configure"
import { useApp } from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const { language, setLanguage, loadFinanceExchange } = useApp();
    loadFinanceExchange();
    setLanguage(language);
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
