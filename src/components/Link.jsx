import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ name, icon, active, setActive, link }) {
    return (
        <Link
            to={link || name}
            onClick={(e) => setActive(e.target.name)}
            name={name}
            className={`d-flex no-wrap "  ${active === name && "selected"}`}
        >
            <i className={` ${icon} px-2`}></i> <span>{name}</span>
        </Link>
    );
}
