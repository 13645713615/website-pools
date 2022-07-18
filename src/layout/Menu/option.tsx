/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-27 17:39:37
 * @LastEditTime: 2022-07-18 18:19:58
 */
import { DropdownOption, MenuOption, NButton, NIcon } from 'naive-ui';
import { useI18n } from "vue-i18n";
import { Search, CellularSharp, Recording, PersonOutline, SettingsOutline, TrailSignOutline, CellularOutline, RecordingOutline, ServerOutline, JournalOutline, StarHalfOutline, ReceiptOutline } from "@vicons/ionicons5"
import { OpenDrawerBut } from '../Drawer';
import { RouterLink } from 'vue-router';
import { useLogout } from '@/hooks';


export function useMenu(): { menuLeftOptions: MenuOption[], menuRightOptions: MenuOption[] } {
    const { t } = useI18n();
    return {
        menuLeftOptions: [
            {
                key: "statistics", label: () => <RouterLink to={{ name: "statistics" }} class="menu-text"><NIcon class="lg:hidden"><CellularOutline /></NIcon>{t("header.statistics")}</RouterLink >
            },
            // {
            //     key: "blocks", label: () => <RouterLink to={{ name: "blocks" }} class="menu-text"><NIcon class="lg:hidden"><RecordingOutline /></NIcon>{t("header.blocks")}</RouterLink>
            // },
            {
                key: "miners", label: () => <RouterLink to={{ name: "miners" }} class="menu-text"><NIcon class="lg:hidden"><ServerOutline /></NIcon>{t("header.miners")}</RouterLink >
            }
        ],
        menuRightOptions: [
            // {
            //     key: "problem", label: () => <RouterLink to={{ name: "problem" }} class="menu-text">{t("header.problem")}</RouterLink>
            // },
            // {
            //     key: "service", label: () => <RouterLink to={{ name: "service" }} class="menu-text">{t("header.service")}</RouterLink >
            // }
        ]
    }
}


export const iconMenuOptions: MenuOption[] = [
    {
        key: "statistics", label: () => <RouterLink to={{ name: "statistics" }}> <NButton size="large" tag="a" text v-slots={{ icon: () => <NIcon component={CellularSharp} /> }}></NButton></RouterLink>
    },
    // {
    //     key: "blocks", label: () => <RouterLink to={{ name: "blocks" }}><NButton size="large" tag="a" text v-slots={{ icon: () => <NIcon component={Recording} /> }}></NButton></RouterLink>
    // },
    {
        key: "search", label: () => <NButton size="large" tag="a" text v-slots={{ icon: () => <NIcon component={Search} /> }}></NButton>
    },
    {
        key: "menu", label: () => <OpenDrawerBut size="large"></OpenDrawerBut>
    }
]


export function useUserMenu(): DropdownOption[] {
    const { t } = useI18n();
    return [
        {
            key: "account", label: () => <RouterLink to={{ name: "account" }} class="menu-text"><NIcon class="mr-0 md:mr-2 lg:mr-4" size={18}><PersonOutline /></NIcon>{t("header.account")}</RouterLink >
        },
        {
            key: "extract", label: () => <RouterLink to={{ name: "extract" }} class="menu-text"><NIcon class="mr-0 md:mr-2 lg:mr-4" size={18}><JournalOutline /></NIcon>{t("header.extract")}</RouterLink >
        },
        {
            key: "follow", label: () => <RouterLink to={{ name: "follow" }} class="menu-text"><NIcon class="mr-0 md:mr-2 lg:mr-4" size={18}><StarHalfOutline /></NIcon>{t("header.follow")}</RouterLink >
        },
        {
            key: "withdraw", label: () => <RouterLink to={{ name: "withdraw" }} class="menu-text"><NIcon class="mr-0 md:mr-2 lg:mr-4" size={18}><ReceiptOutline /></NIcon>小额提币</RouterLink >
        },
        {
            key: "setup", label: () => <RouterLink to={{ name: "setup" }} class="menu-text"><NIcon class="mr-0 md:mr-2 lg:mr-4" size={18}><SettingsOutline /></NIcon>{t("header.setup")}</RouterLink >
        },
        {
            key: "signout", label: () => <a class="menu-text" onClick={() => useLogout()}><NIcon class="mr-0 md:mr-2 lg:mr-4" size={18}><TrailSignOutline /></NIcon><span class="text-red-600">{t("button.signout")}</span></a>
        }
    ]
}