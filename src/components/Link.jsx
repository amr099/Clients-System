import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ name, active, icon, onClick }) {
    return (
        <Link
            to={name}
            onClick={onClick}
            name={name}
            className={active === name && "selected"}
        >
            <i className={icon}></i> <span>{name}</span>
        </Link>
    );
}
