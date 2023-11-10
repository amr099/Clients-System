import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ name, icon, active, setActive }) {
  return (
    <Link
      to={name}
      onClick={(e) => setActive(e.target.name)}
      name={name}
      className={`d-flex no-wrap px-4"  ${active === name && "selected"}`}
    >
      <i className={icon}></i> <span>{name}</span>
    </Link>
  );
}
