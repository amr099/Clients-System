import React, { useState } from "react";
import Backup from "./Backup";
import Stack from "react-bootstrap/Stack";
import CustomLink from "./Link";

export default function Nav() {
    const [active, setActive] = useState("");
    const onClick = (e) => {
        console.log(e.target.name);
        setActive(e.target.name);
    };
    return (
        <nav>
            <h3>New</h3>
            <Stack gap={3}>
                <CustomLink
                    name={"Client"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-person-plus"}
                />
                <CustomLink
                    name={"Transaction"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-stack"}
                />
                <CustomLink
                    name={"Payment"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-wallet"}
                />
                <CustomLink
                    name={"Expense"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-coin"}
                />
            </Stack>
            <hr />
            <h3>View</h3>
            <Stack gap={3}>
                <CustomLink
                    name={"Transactions"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-card-list"}
                />
                <CustomLink
                    name={"Expenses"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-cash-coin"}
                />
                <CustomLink
                    name={"RevenuesChart"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-bar-chart"}
                />
            </Stack>
            <hr />
            <h3>Edit</h3>
            <Stack gap={3}>
                <CustomLink
                    name={"Client Info"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-pencil-square"}
                />
                <CustomLink
                    name={"Services List"}
                    active={active}
                    onClick={onClick}
                    icon={"bi bi-file-earmark-text"}
                />
                <hr />
                <Backup />
            </Stack>
        </nav>
    );
}
