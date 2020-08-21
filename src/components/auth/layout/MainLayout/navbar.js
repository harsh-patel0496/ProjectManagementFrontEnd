import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { useStylesNavbar, useStyleMain } from "../../static/css/cssMain";
//import { useTranslation, Trans } from "react-i18next";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TranslateIcon from "@material-ui/icons/Translate";

export default function Navbar(props) {
    const classes = useStylesNavbar();
    const style = useStyleMain();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const preLang = localStorage.getItem("lng");
    let selectedLang = "";
    if (preLang == "en") {
        selectedLang = "ENGLISH";
    } else {
        selectedLang = "DENISH";
    }
    const [lang, setLang] = React.useState(selectedLang);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    //const { i18n } = useTranslation();
    // const changeLanguage = lng => {
    //     console.log(lng);
    //     localStorage.setItem("lng", lng);
    //     i18n.changeLanguage(lng);
    // };
    // const handleClose = e => {
    //     console.log(e.target.innerText);
    //     if (e.target.innerText == "English") {
    //         changeLanguage("en");
    //         setLang("ENGLISH");
    //     } else {
    //         changeLanguage("de");
    //         setLang("DENISH");
    //     }
    //     setAnchorEl(null);
    // };
    return (
        <div>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.toggleDrawer("left", true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={style.quoteText} variant="h4" noWrap>
                        Ship Broker
                    </Typography>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder={t("Search")}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div> */}
                    {/* <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ color: "white", marginLeft: "2%" }}
                    >
                        <TranslateIcon />
                        {lang}
                    </Button> */}
                    {/* <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} value="en">
                            English
                        </MenuItem>
                        <MenuItem onClick={handleClose} value="dk">
                            Denish
                        </MenuItem>
                    </Menu> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}
