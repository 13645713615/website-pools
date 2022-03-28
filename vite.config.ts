/*
 * @Descripttion:
 * @version:
 * @Author: Carroll
 * @Date: 2022-02-26 10:13:35
 * @LastEditTime: 2022-03-19 18:09:38
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
import getEnvConfig from "./getEnvConfig"

const env = getEnvConfig();
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => (
  {
    plugins: [
      vue(),
      vueJsx()
    ],
    base: "/",
    server: {
      host: "0.0.0.0",
      port: 8030,
      open: true,
      proxy: {
        [env.VITE_APP_IMAGES_BASE]: {
          target: env.VITE_APP_PEOXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^\\" + env.VITE_APP_IMAGES_BASE), '')
        },
        // "^/[A-Za-z0-9_]+\.(png|jpg|gif)$": {
        //   target: env.VITE_APP_PEOXY_TARGET,
        //   changeOrigin: true,
        // },
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_PEOXY_TARGET,
          changeOrigin: true,
          // rewrite: (path) => path.replace(new RegExp("^\\" + env.VITE_APP_BASE_API), '')
        },
        "/finance": {
          target: "http://web.juhe.cn/",
          changeOrigin: true,
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@css": path.resolve(__dirname, "./src/assets/css"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@root": path.resolve(__dirname, "./"),
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
));
