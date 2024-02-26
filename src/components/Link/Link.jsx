import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Link.module.scss";

export default function CustomLink({ name, icon, active, setActive, link }) {
    const isMobile = useMediaQuery({ maxWidth: "769px" });
    return (
        <Link
            to={link}
            onClick={(e) => setActive(e.target.name)}
            name={name}
            className={`${styles.link} ${active === name && styles.selected} ${
                isMobile && "mx-auto"
            }`}
        >
            <i className={` ${icon} ${styles.navicon} px-2`}></i>{" "}
            {!isMobile && name}
        </Link>
    );
}
