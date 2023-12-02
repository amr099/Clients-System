import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({
    name,
    icon,
    active,
    setActive,
    link,
    styles,
}) {
    return (
        <Link
            to={link}
            onClick={(e) => setActive(e.target.name)}
            name={name}
            className={`d-flex no-wrap align-items-center" ${styles.link} ${
                active === name && styles.selected
            }`}
        >
            <i className={` ${icon} ${styles.navicon} px-2`}></i>{" "}
            <span>{name}</span>
        </Link>
    );
}
