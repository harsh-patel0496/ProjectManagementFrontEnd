import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

//const themeColor = "#6EB33E";
const themeColor = "#63809c";
//const themeColor = "#709ff5";
//const themeColor = "#666666";
const fontColor = "#717171";
//const themeColorDark = "#5e9834";
const themeColorDark = "#5a748c";
//const themeColorDark = "#404040";

export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: themeColorDark,
        main: themeColor,
        light: colors.indigo[100],
        fontFamily: "calibri"
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue[400],
        light: themeColor,
        fontFamily: "calibri"
    },
    success: {
        contrastText: white,
        dark: colors.green[800],
        main: colors.green[600],
        light: colors.green[400]
    },
    info: {
        contrastText: white,
        dark: colors.blue[800],
        main: colors.blue[600],
        light: colors.blue[400]
    },
    warning: {
        contrastText: white,
        dark: colors.orange[900],
        main: colors.orange[600],
        light: colors.orange[400]
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        link: colors.blue[600],
        fontFamily: "calibri"
    },
    title: {
        primary: fontColor,
        fontFamily: "calibri"
    },
    background: {
        default: "#F4F6F8",
        themeColor: themeColor,
        paper: white
    },
    icon: colors.blueGrey[600],
    divider: colors.grey[200]
};
