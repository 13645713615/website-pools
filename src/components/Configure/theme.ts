/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-27 21:25:21
 * @LastEditTime: 2022-03-17 20:39:38
 */
import { GlobalThemeOverrides } from "naive-ui"

const enum Color {
    Blue = '#0069FF',
    DarkBlue = '#005adb',
    LightBlue = '#217dff',
    SkyBlue = "#1890FF",
    DarkSkyBlue = "#0b86f9",
    LightSkyBlue = "#3198f7"
}

const theme: GlobalThemeOverrides = {
    common: {
        primaryColor: Color.Blue,
        fontSize: "1rem",
        fontSizeMedium: "0.93rem",
        fontSizeLarge: "1rem",
        heightLarge: "50px",
        heightMedium: "40px"
    },
    Button: {
        colorPrimary: Color.Blue,
        colorPressedPrimary: Color.DarkBlue,
        colorFocusPrimary: Color.LightBlue,
        colorHoverPrimary: Color.LightBlue,

        colorSuccess: Color.SkyBlue,
        colorPressedSuccess: Color.DarkSkyBlue,
        colorFocusSuccess: Color.LightSkyBlue,
        colorHoverSuccess: Color.LightSkyBlue,

        colorDisabledSuccess: Color.SkyBlue,
    },
    Menu: {
        itemTextColorHover: "rgb(31, 34, 37)",
        itemTextColor: "rgb(31, 34, 37)",
        itemTextColorActive: Color.Blue,
    },
    Input: {
        borderFocus: "1px solid " + Color.Blue,
        borderHover: "1px solid " + Color.LightBlue,
    },
    Layout: {
        color: "transparent"
    },
    Message:{
        padding:"15px 25px 15px 30px"
        
    }
}

export default theme