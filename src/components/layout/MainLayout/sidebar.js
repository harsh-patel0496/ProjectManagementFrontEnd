import React from "react";
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import Navbar from "./navbar.js";
import { connect } from "react-redux";
import { useStyles } from "../../static/css/css_dashboard";
//import { useTranslation } from "react-i18next";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
//import Profile from "../common/profile";
import { Link } from "react-router-dom";

const Layout = props => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });
    //const { t } = useTranslation();
    const toggleDrawer = (side, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const handleLogout = () => {
        console.log(props.children.props);
        localStorage.setItem("shipbrokerToken", "");
        props.dispatch({ type: "LOGOUT", payload: "" });
        props.children.props.history.push("/login");
    };
    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {/* <Profile className={classes.profile} /> */}
            <Divider />
            <List>
                <Link to="/">
                    <ListItem button to="/">
                        <ListItemIcon className={classes.IconStyle}>

                            {" "}
                            <DashboardOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />

                    </ListItem>
                </Link>
                <Link to="/shipment">
                    <ListItem button to="/shipment">
                        <ListItemIcon className={classes.IconStyle}>
                            {" "}
                            <LocalShippingOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shipment" />
                    </ListItem>
                </Link>

                <Link to="/account">
                    <ListItem button to="/account">
                        <ListItemIcon className={classes.IconStyle}>
                            {" "}
                            <PersonOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />

                    </ListItem>
                </Link>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon className={classes.IconStyle}>
                        <ExitToAppOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="logout" />
                </ListItem>
            </List>
        </div>
    );
    console.log(props.loggedIn);
    return (
        <div>
            {props.loggedIn == true && (
                <div>
                    <Drawer
                        open={state.left}
                        onClose={toggleDrawer("left", false)}
                    >
                        {sideList("left")}
                    </Drawer>
                    <Navbar toggleDrawer={toggleDrawer} />
                </div>
            )}
            {props.children}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
};
export default connect(mapStateToProps)(Layout);
