import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import CustomLink from "../Link/Link";
import styles from "./sidebar.module.css";
import Backup from "./../Backup";

const Links = [
    { name: "Overview", icon: "bi bi-clipboard2-data-fill", link: "/" },
    { name: "Clients", icon: "bi bi-person-fill", link: "/clients" },
    { name: "New Client", icon: "bi bi-person-plus-fill", link: "/client" },
];

export default function Sidebar() {
    const [active, setActive] = useState("");

    return (
        <nav>
            <Stack gap={3} className={styles.linkstack}>
                {Links.map((link) => (
                    <CustomLink
                        key={link.name}
                        name={link.name}
                        active={active}
                        setActive={setActive}
                        icon={link.icon}
                        link={link.link}
                    />
                ))}
                <hr />
                <Backup />
            </Stack>
        </nav>
    );
}
